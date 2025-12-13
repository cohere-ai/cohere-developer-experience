import { Octokit } from "@octokit/rest"
import * as childProcess from "child_process"

export const execCmd = async (cmd: string, cwd: string): Promise<{ error: null | childProcess.ExecException, stderr: string, stdout: string }> => {
    return new Promise((resolve, reject) => {
        try {
            childProcess.exec(cmd, { cwd }, (error, stdout, stderr) => {
                if (error) {
                    resolve({ error, stderr, stdout })
                }
                resolve({ error, stderr, stdout })
            })
        } catch (error) {
            resolve({ error, stderr: '', stdout: '' })
        }
    })
}

const versionMatchRegex = /v?(\d+\.\d+\.\d+)/g

const languages = ["python", "typescript", "go", "java"] as const

const bumpTypes = ["major", "minor", "patch"] as const

const sortVersions = (versions: string[]) => {
    return versions.sort((a, b) => {
        const [aMajor, aMinor, aPatch] = a.split(".").map(Number)
        const [bMajor, bMinor, bPatch] = b.split(".").map(Number)

        if (aMajor !== bMajor) {
            return aMajor - bMajor
        } else if (aMinor !== bMinor) {
            return aMinor - bMinor
        }

        return aPatch - bPatch
    })
}

const getPythonVersions = async () => {
    const response = await fetch("https://pypi.org/simple/cohere/")
    const text = await response.text()
    const matches = text.matchAll(versionMatchRegex)
    return [...matches].map(m => m[1])
}

const getNpmVersions = async () => {
    const response = await fetch("https://registry.npmjs.org/-/package/cohere-ai/dist-tags")
    const json = await response.json() as { latest: string }
    return [json.latest]
}

const getGoVersions = async () => {
    const response = await fetch("https://proxy.golang.org/github.com/cohere-ai/cohere-go/v2/@latest")
    const json = await response.json() as { Version: string }
    return [json.Version.replace("v", "")]
}

const getJavaVersion = async () => {
    // Simplified per request: single Sonatype Central endpoint returning docs[0].v
    // Example response doc: { id: 'com.cohere:cohere-java:1.0.8', g: 'com.cohere', a: 'cohere-java', v: '1.0.8', ... }
    const url = 'https://central.sonatype.com/solrsearch/select?q=g:com.cohere%20AND%20a:cohere-java&rows=1&wt=json'
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) {
            throw new Error(`Non-OK status ${res.status}`)
        }
        const json = await res.json() as { response?: { docs?: Array<{ v?: string }> } }
        const version = json.response?.docs?.[0]?.v
        if (!version) {
            throw new Error('Version not found in response')
        }
        return version
    } catch (e: any) {
        console.error(`[getJavaVersion] Failed to fetch from Sonatype Central: ${e?.message || e}`)
        throw e
    } finally {
        clearTimeout(timeout)
    }
}

const getLatestVersionForLanguage = async (language: typeof languages[number]) => {
    switch (language) {
        case 'python': {
            const versions = await getPythonVersions();
            return sortVersions(versions).pop()!
        }
        case 'typescript': {
            const versions = await getNpmVersions();
            return sortVersions(versions).pop()!
        }
        case 'go': {
            const versions = await getGoVersions();
            return sortVersions(versions).pop()!
        }
        case 'java': {
            return await getJavaVersion();
        }
    }
}

const updateVersion = async (version: string, update: typeof bumpTypes[number]) => {
    const [major, minor, patch] = version.split(".").map(Number)

    return ({
        major: `${major + 1}.0.0`,
        minor: `${major}.${minor + 1}.0`,
        patch: `${major}.${minor}.${patch + 1}`,
    })[update]
}

const getNextVersions = async (update: typeof bumpTypes[number], targetLanguage: typeof languages[number] | 'all') => {
    if (targetLanguage !== 'all') {
        const latest = await getLatestVersionForLanguage(targetLanguage)
        return {
            [targetLanguage]: {
                previous: latest,
                next: await updateVersion(latest, update)
            }
        } as Record<typeof languages[number], { previous: string, next: string }>
    }

    // all languages
    const latestAll = await Promise.all(languages.map(async l => [l, await getLatestVersionForLanguage(l)] as const))
    return Object.fromEntries(await Promise.all(latestAll.map(async ([lang, latest]) => [lang, { previous: latest, next: await updateVersion(latest, update) }]))) as Record<typeof languages[number], { previous: string, next: string }>
}

const formatTagName = (language: typeof languages[number], version: string) => `${language}@${version}`

const maybeDeleteRelease = async (language: typeof languages[number], version: string) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

    for await (const releases of octokit.paginate.iterator(
        octokit.repos.listReleases,
        {
            owner: process.env.GITHUB_OWNER!,
            repo: process.env.GITHUB_REPO!,
        }
    )) {
        const release = releases.data.find(release => release.tag_name === formatTagName(language, version))

        console.log(`Deleting existing release for ${formatTagName(language, version)}`)

        if (release) {
            await octokit.repos.deleteRelease({
                owner: process.env.GITHUB_OWNER!,
                repo: process.env.GITHUB_REPO!,
                release_id: release.id,
            })
            await octokit.git.deleteRef({
                owner: process.env.GITHUB_OWNER!,
                repo: process.env.GITHUB_REPO!,
                ref: `tags/${release.tag_name}`,
            })
        }
    }
}

const createRelease = async (language: typeof languages[number], version: string) => {
    if (process.env.DRY_RUN === 'true' || process.env.FERN_PREVIEW === 'true') {
        console.log(`[dry-run] Skipping creation of GitHub release for ${formatTagName(language, version)}`)
        return
    }
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

    await maybeDeleteRelease(language, version)

    const tagName = formatTagName(language, version)

    await octokit.git.createRef({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        ref: `refs/tags/${tagName}`,
        sha: process.env.GITHUB_SHA!,
    })

    await octokit.repos.createRelease({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        tag_name: tagName,
        name: tagName,
        body: `This release updates the ${language} package to ${version}.`,
    })
}

const runFernGenerate = async (language: typeof languages[number], version: string) => {
    // DRY_RUN preferred; FERN_PREVIEW kept for backward compatibility
    const preview = process.env.DRY_RUN === 'true' || process.env.FERN_PREVIEW === 'true'
    const command = `fern generate --api sdks --group ${language} --version "${version}" --log-level debug ${preview ? '--preview' : ''}`.trim()

    const { error, stderr, stdout } = await execCmd(command, process.cwd())

    if (stderr) {
        console.error(stderr)
    }

    if (stdout) {
        console.log(stdout)
    }

    if (error) {
        console.error(`Error running fern generate for ${language}@${version}`)
        throw error
    }
}

(async () => {
    const bumpType = process.env.BUMP_TYPE as typeof bumpTypes[number] | undefined
    const language = process.env.LANGUAGE as typeof languages[number] | "all" | undefined
    const version = process.env.VERSION as string | undefined

    if (version) {
        if (!language || language === "all") {
            throw new Error("When VERSION is set, LANGUAGE must be a specific language (not 'all').")
        }
        await createRelease(language, version)
        await runFernGenerate(language, version)
        return
    }

    if (!bumpType) {
        throw new Error("BUMP_TYPE is not defined.")
    }

    if (!language) {
        throw new Error("LANGUAGE is not defined.")
    }

    const nextVersions = await getNextVersions(bumpType, language)

    if (Object.values(nextVersions).map(v => v.next).some(v => !v)) {
        throw new Error("Failed to determine next versions, please try setting them manually", { cause: nextVersions })
    }

    await Promise.all(
        languages
            .filter(l => language === "all" ? true : l === language)
            .flatMap(async language => [
                createRelease(language, nextVersions[language].next),
                runFernGenerate(language, nextVersions[language].next)
            ])
    )

})()