import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import os from "os";
import { STATIC_DIR } from "./config";

const DefaultAPIKey = "";

const IgnoreFileIndicator = "[skip-file-snippets]";
const IgnoreSnippetIndicator = "[ignore-snippet]";
const EmptyRunCMD = `poetry run python -c ""`;

const setApiKey = (content: string): string => {
  const apiKey = process.env.COHERE_API_KEY || DefaultAPIKey;
  const pattern = /(cohere\.ClientV?\d?\()\s*[^,)]+(?=\))/g;

  return content.replace(pattern, `${'$1'}'${apiKey}'`);
};

const replaceGetpass = (content: string): string => {
  const apiKey = process.env.COHERE_API_KEY || DefaultAPIKey;

  const pattern = /\b(?:getpass(?:\.getpass)?)\(\s*['"][^'"]*['"]\s*\)/g;

  return content.replace(pattern, `"${apiKey}"`);
};

const replaceAzureVars = (content: string): string => {
  const defaultEndpoint =
    "https://cohere-command-r-plus-08-2024-xyz.eastus.models.ai.azure.com/";
  const apiKey = process.env.COHERE_API_KEY || DefaultAPIKey;
  const endpoint = process.env.COHERE_ENDPOINT || defaultEndpoint;

  return content
    .replace(/"AZURE_API_KEY_CHAT"/g, `"${apiKey}"`)
    .replace(/"AZURE_ENDPOINT_CHAT"/g, `"${endpoint}"`);
};

const rewriteFilePaths = (code: string): string => {
  const openFilePattern = /open\(["']([^"']+)["'](,?\s*["'][^"']*["'])?\)/g; // Match open("path/to/file", "rb") or open('path/to/file')
  return code.replace(openFilePattern, (match, filePath, mode) => {
    const newPath = path.join(STATIC_DIR, path.basename(filePath)); // Rewrite to static directory
    return `open("${newPath}"${mode || ""})`; // Preserve the mode argument if it exists
  });
};

const sanitizeSnippet = (code: string): string => {
  return code
    .split("\n")
    .map((line) => {
      const trimmed = line.trimStart();
      if (trimmed.startsWith("!") || trimmed.startsWith("%")) {
        return `# ${line}`;
      }
      return line;
    })
    .join("\n");
};

const extractPythonSnippets = (filePath: string): string[] => {
  const content = fs.readFileSync(filePath, "utf8");

  if (content.includes(IgnoreFileIndicator)) {
    return [];
  }
  const codeBlockPattern = /(^|\n)(`{3,4})python([^\n]*)\n([\s\S]*?)\n\2(?!`)/g;

  const snippets: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = codeBlockPattern.exec(content)) !== null) {
    const modifiersLine = match[3]?.toLowerCase() || "";
    if (modifiersLine.includes(IgnoreSnippetIndicator)) {
      continue;
    }

    let snippet = match[4];
    snippet = sanitizeSnippet(snippet);
    snippet = rewriteFilePaths(snippet);
    snippet = setApiKey(snippet);
    snippet = replaceGetpass(snippet);
    snippet = replaceAzureVars(snippet);
    snippets.push(snippet);
  }

  return snippets;
};

export const execPythonSnippet = (file: string, cwd: string) => {
  console.log(`Running snippet from file: ${file}`);
  const filePath = path.join(cwd, file);
  const snippets = extractPythonSnippets(filePath);
  if (snippets.length === 0) return EmptyRunCMD;

  const combinedSnippets = snippets.join("\n\n");
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "py-snippet-"));
  const tempFile = path.join(tempDir, `${randomUUID()}.py`);
  fs.writeFileSync(tempFile, combinedSnippets, "utf8");

  return `poetry run python "${tempFile}"`;
};
