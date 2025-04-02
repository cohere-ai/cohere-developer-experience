import { randomUUID } from 'crypto';
import fs from "fs";
import path from 'path';
import os from 'os';

const DefaultAPIKey = 'vwqC5L4Wq3zHgZPmnouZYqlmaobeIPYkeRFQqVo3';  // Default API key


const FilesToIgnore = [
    "README.md",
];

const EmptyRunCMD = `poetry run python -c ""`;


const setApiKey = (content: string): string => {
  const apiKey = process.env.COHERE_API_KEY || DefaultAPIKey;
  const pattern = /(cohere\.ClientV?\d?\()([^,)]+)(\))/g;
  const apiKeyPattern = `$1'${apiKey}'$3`;
  return content.replace(pattern, apiKeyPattern);
};

const sanitizeSnippet = (code: string): string => {
    return code
      .split('\n')
      .map((line) => {
        const trimmed = line.trimStart();
        if (trimmed.startsWith('!') || trimmed.startsWith('%%')) {
          return `# ${line}`;
        }
        return line;
      })
      .join('\n');
  };
  

const extractPythonSnippets = (filePath: string): string[] => {
  const content = fs.readFileSync(filePath, 'utf8');
  const codeBlockPattern = /(`{3,4})python(?:\s+([\w\s]+))?\n([\s\S]*?)\n\1/g;

  const snippets: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = codeBlockPattern.exec(content)) !== null) {
    const modifiers = (match[2] || '').toLowerCase().split(/\s+/);
    let snippet = match[3].trim();
    
    snippet = sanitizeSnippet(setApiKey(snippet));

    if (modifiers.includes('ignore')) {
      continue;
    }

    snippets.push(setApiKey(snippet));
  }

  return snippets;
};

export const execPythonSnippet = (file: string, cwd: string) => {
  if (FilesToIgnore.includes(file)) {
    return EmptyRunCMD;
  }

  const filePath = path.join(cwd, file);
  const snippets = extractPythonSnippets(filePath);
  if (snippets.length === 0) return EmptyRunCMD;

  const combinedSnippets = snippets.join("\n\n");

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'py-snippet-'));
  const tempFile = path.join(tempDir, `${randomUUID()}.py`);
  fs.writeFileSync(tempFile, combinedSnippets, 'utf8');

  return `poetry run python "${tempFile}"`;
};