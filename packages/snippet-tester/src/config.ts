import path from "path";

export interface Language {
    name: string;
    exec: (file: string) => string;
    snippetRoot: (base: string) => string;
    glob: string;
}

export const config: {
    languages: Language[];
} = {
    "languages": [
        {
            "name": "node",
            "exec": (file: string) => `node ${file}`,
            "snippetRoot": (base: string) => path.join(base, "./snippets/node"),
            "glob": "**/*.js"
        },
        // {
        //     "name": "java",
        //     "exec": (file: string) => `java ${file}`,
        //     "snippetRoot": (base: string) => path.join(base, "./snippets/java"),
        //     "glob": "**/*.java"
        // },
        // {
        //     "name": "python",
        //     "exec": (file: string) => `python ${file}`,
        //     "snippetRoot": (base: string) => path.join(base, "./snippets/python"),
        //     "glob": "**/*.go"   
        // },
        // {
        //     "name": "golang",
        //     "exec": (file: string) => `go run ${file}`,
        //     "snippetRoot": (base: string) => path.join(base, "./snippets/go"),
        //     "glob": "**/*.go"
        // }
    ]
}