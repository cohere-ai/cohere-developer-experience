import { Octokit } from "@octokit/rest"

const versionMatchRegex = /v?(\d+\.\d+\.\d+)/g

const languages = ["python", "typescript", "go", "typescript"] as const

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

const updateVersion = async (version: string, update: typeof bumpTypes[number]) => {
    const [major, minor, patch] = version.split(".").map(Number)

    return ({
        major: `${major + 1}.0.0`,
        minor: `${major}.${minor + 1}.0`,
        patch: `${major}.${minor + 1}.${patch + 1}`,
    })[update]
}

const getLatestVersions = async () => {
    const [pythonVersions, typescriptVersions, goVersions] = await Promise.all([
        getPythonVersions(),
        getNpmVersions(),
        getGoVersions(),
    ])
    return {
        python: sortVersions(pythonVersions).pop()!,
        typescript: sortVersions(typescriptVersions).pop()!,
        go: sortVersions(goVersions).pop()!,
        java: "0.0.0" // TODO: java
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

    await octokit.repos.createRelease({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        tag_name: formatTagName(language, version),
        name: formatTagName(language, version),
        body: `This release updates the ${language} package to ${version}.`,
    })
}

(async () => {
    const bumpType = process.env.BUMP_TYPE as typeof bumpTypes[number] | undefined
    const language = process.env.LANGUAGE as typeof languages[number] | undefined

    if (!bumpType) {
        throw new Error("BUMP_TYPE is not defined.")
    }

    const nextVersions = await getNextVersions(bumpType)

    await Promise.all(languages.filter(l => language ? l === language : true).map(async language => createRelease(language, nextVersions[language].next)))
})()