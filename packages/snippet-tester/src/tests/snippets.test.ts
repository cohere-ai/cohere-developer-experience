import { describe, expect, test } from '@jest/globals';
import { CohereClient } from 'cohere-ai';
import * as fs from "fs";
import { glob } from "glob";
import path from 'path';
import { config, Language } from '../config';
import { execCmd } from '../utils';

// recurse up until you find a pnpm-workspace.yaml  
const findPnpmWorkspaceDir = (curDir = __dirname) => {
    if (curDir === "/") {
        throw new Error("Could not find pnpm-workspace.yaml")
    }

    if (fs.existsSync(path.resolve(curDir, "pnpm-lock.yaml"))) {
        return curDir
    }

    return findPnpmWorkspaceDir(fs.realpathSync(path.resolve(curDir, "..")))
}

const workspaceDir = findPnpmWorkspaceDir()

const failureReasons = {
    "NotFoundError": {
        "description": "Thrown when a resource is not found. It occurs in various contexts, such as embed jobs, datasets, connectors, and finetuned models."
    },
    "BadRequestError": {
        "description": "Indicates a bad request due to invalid parameters or data. Seen in connector creation, finetuned model operations, and dataset-related actions."
    },
    "InternalServerError": {
        "description": "Represents an internal server error, suggesting an issue with server-side processing. Appears in listing events for finetuned models."
    },
    "JsonError": {
        "description": "Related to JSON parsing issues, occurs when there is a problem with JSON data, such as missing required keys."
    },
    "TypeError": {
        "description": "Thrown when there is a type-related issue, often due to unexpected keyword arguments or incorrect data types."
    },
    "FileNotFoundError": {
        "description": "Indicates that a file is not found, as seen in the dataset-post.py test."
    },
    "IllegalStateException": {
        "description": "Related to the state of an object, occurs due to a closed resource."
    },
    "ReferenceError": {
        "description": "Thrown when a variable or object is accessed before it is defined or initialized."
    },
    "SocketTimeoutException": {
        "description": "Indicates a network timeout, a network operation took longer than the specified timeout period."
    },
    "InvalidFormatException": {
        "description": "Related to JSON deserialization, occurs when data cannot be deserialized into the expected format."
    },
    "RuntimeException": {
        "description": "A general runtime exception, indicating an unexpected issue during execution."
    },
    "ClassNotFoundException": {
        "description": "Thrown when a class is not found, suggesting a missing or incorrectly named class."
    },
    "NullPointerException": {
        "description": "Indicates a null pointer exception, often due to accessing a member of a null object."
    },
    "Other": {
        "description": "Any other error not covered by the existing categories."
    }
}


describe.each(config.languages.map(o => [o.name, o] as [string, Language]))("Testing language %s", (name, lang) => {
    const cwd = lang.snippetRoot(workspaceDir)
    const filePaths = glob.globSync(lang.glob, { cwd })

    test.concurrent.each(filePaths)('testing file %s', async (filePath) => {
        const { error } = await execCmd(lang.exec(filePath), cwd)

        const co = new CohereClient()

        let err = { "error": "passed" }

        if (error) {
            const explain = await co.v2.chat({
                model: "command-r-plus",
                messages: [{
                    role: "user", content: `
                    Please classify this error into the following categories:
                    ${error}
                    
                    error categories:
    
                    ${JSON.stringify(failureReasons)}`
                }],
                temperature: 0,
                responseFormat: {
                    type: "json_object",
                    jsonSchema: {
                        type: "object",
                        required: ["error"],
                        properties: {
                            error: {
                                type: "string",
                                enum: Object.keys(failureReasons)
                            }
                        }
                    }
                }
            })

            err = JSON.parse(explain.message?.content?.[0].text || "{}")
            console.error(error)
        }
        
        expect(err.error).toMatchSnapshot()

    }, 1000000);
})