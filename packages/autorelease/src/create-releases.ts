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
    const response = await fetch("https://search.maven.org/solrsearch/select?q=g:com.cohere+AND+a:cohere-java&rows=1&wt=json")
    const json = await response.json() as { response: { docs: Array<{ latestVersion: string }> } }
    const latest = json.response.docs[0]?.latestVersion
    return latest ?? "0.0.0"
}

const updateVersion = async (version: string, update: typeof bumpTypes[number]) => {
    const [major, minor, patch] = version.split(".").map(Number)

    return ({
        major: `${major + 1}.0.0`,
        minor: `${major}.${minor + 1}.0`,
        patch: `${major}.${minor}.${patch + 1}`,
    })[update]
}

const getLatestVersions = async () => {
    const [pythonVersions, typescriptVersions, goVersions, javaVersion] = await Promise.all([
        getPythonVersions(),
        getNpmVersions(),
        getGoVersions(),
        getJavaVersion()
    ])
    return {
        python: sortVersions(pythonVersions).pop()!,
        typescript: sortVersions(typescriptVersions).pop()!,
        go: sortVersions(goVersions).pop()!,
        java: javaVersion
    }
}

const getNextVersions = async (update: typeof bumpTypes[number]) => {
    const latest = await getLatestVersions()

    return {
        python: {
            previous: latest.python,
            next: await updateVersion(latest.python, update),
        },
        typescript: {
            previous: latest.typescript,
            next: await updateVersion(latest.typescript, update),
        },
        go: {
            previous: latest.go,
            next: await updateVersion(latest.go, update),
        },
        java: {
            previous: latest.java,
            next: await updateVersion(latest.java, update),
        }
    }
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
    const command = `fern generate --api sdks --group ${language} --version "${version}" --log-level debug`

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

    if (!bumpType) {
        throw new Error("BUMP_TYPE is not defined.")
    }

    if (!language) {
        throw new Error("LANGUAGE is not defined.")
    }

    const nextVersions = await getNextVersions(bumpType)

    await Promise.all(
        languages
            .filter(l => language === "all" ? true : l === language)
            .flatMap(async language => [
                createRelease(language, nextVersions[language].next),
                runFernGenerate(language, nextVersions[language].next)
            ])
    )

})()