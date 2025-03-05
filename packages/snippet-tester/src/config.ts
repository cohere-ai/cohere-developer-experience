import path from "path";
import * as childProcess from "child_process"
import { execPythonSnippet } from "./snippets_utils";

export interface Language {
    name: string;
    exec: (file: string, cwd:string) => string;
    snippetRoot: (base: string) => string;
    glob: string;
    execCmd?: (cmd: string, cwd: string) => Promise<{error: null | childProcess.ExecException, stderr: string, stdout: string}>;
}

export const config: {
    languages: Language[];
} = {
    "languages": [
        {
            "name": "node",
            "exec": (file: string, cwd: string) => `node ${file}`,
            "snippetRoot": (base: string) => path.join(base, "./snippets/node"),
            "glob": "**/*.js"
        },
        {
            "name": "java",
            "exec": (file: string, cwd: string) => {
                const classPath = file.replace("app/src/main/java/", "").replace(".java", "").split("/").join(".");
                
                return `gradle -PmainClass=${classPath} run`
            },
            "snippetRoot": (base: string) => path.join(base, "./snippets/java"),
            "glob": "./app/src/main/java/**/*.java"
        },
        {
            "name": "python",
            "exec": (file: string, cwd: string) => `poetry run python ${file}`,
            "snippetRoot": (base: string) => path.join(base, "./snippets/python"),
            "glob": "**/*.py"   
        },
        {
            "name": "Python code snippets",
            "exec": execPythonSnippet,
            "snippetRoot": (base: string) => path.join(base, "./fern/pages/cohere-for-ai"),
            "glob": "**/*.mdx",
        },
        {
            "name": "golang",
            "exec": (file: string, cwd: string) => `go run ${file}`,
            "snippetRoot": (base: string) => path.join(base, "./snippets/go"),
            "glob": "**/*.go"
        }
    ]
}