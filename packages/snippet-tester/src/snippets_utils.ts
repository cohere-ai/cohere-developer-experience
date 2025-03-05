
import fs from "fs";
import path from 'path';

const DefaultAPIKey = 'vwqC5L4Wq3zHgZPmnouZYqlmaobeIPYkeRFQqVo3';  // Default API key


const FilesToIgnore = [
    "README.md",
];


// Function to replace the API key placeholder in Python code snippets
const setApiKey = (content: string): string => {
    const apiKey = process.env.COHERE_API_KEY || DefaultAPIKey;
    const pattern = /(cohere\.ClientV?\d?\()([^,)]+)(\))/g;
    const apiKeyPattern = `$1'${apiKey}'$3`;
    return content.replace(pattern, apiKeyPattern);
}

// Function to extract and modify Python snippets from an MDX file
const  extractPythonSnippets = (filePath: string): string[] => {
    const content = fs.readFileSync(filePath, 'utf8');
    const codeBlockPattern = /(`{3,4})(python|python PYTHON)\n(.*?)\n\1/g;
    let match: RegExpExecArray | null;
    const snippets: string[] = [];

    while ((match = codeBlockPattern.exec(content)) !== null) {
        let snippet = match[3].trim();
        snippet = setApiKey(snippet);  // Set API key within each snippet
        snippets.push(snippet);
    }

    return snippets;
}

export const execPythonSnippet = (file: string, cwd: string) => {
    if (FilesToIgnore.includes(file)) {
        return "";
    }
    const filePath = path.join(cwd, file);
    console.log(`Executing Python snippets in ${filePath}`);
    const snippets = extractPythonSnippets(filePath);
    const combinedSnippets = snippets.join("\n\n");

    return  `poetry run python -c "${combinedSnippets}"`
}
