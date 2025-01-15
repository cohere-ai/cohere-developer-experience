import { Octokit } from "@octokit/rest"


const deleteNMostRecentReleases = async (n: number) => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

    const releases = await octokit.repos.listReleases({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
    })

    const toDelete = releases.data.slice(0, n)

    await Promise.all(toDelete.map(async (release) => {
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
    }))
}


(async () => {
    const nVersions = process.env.N_VERSIONS;

    if (!nVersions) {
        throw new Error("N_VERSIONS is not defined.")
    }

    if (Number(nVersions) < 1) {
        throw new Error("N_VERSIONS must be greater than 0.")
    }

    if (Number(nVersions) > 4) {
        throw new Error("N_VERSIONS must be less than 5 (to stop u accidentally deleting too many).")
    }

    await deleteNMostRecentReleases(Number(nVersions))
})()