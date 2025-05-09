import { randomUUID } from 'crypto';
import fs from "fs";
import path from 'path';
import os from 'os';

const DefaultAPIKey = 'vwqC5L4Wq3zHgZPmnouZYqlmaobeIPYkeRFQqVo3';  // Default API key


const FilesToIgnore = [
    // causing timeouts
    "integrations/integrations/elasticsearch-and-cohere.mdx",
    "cookbooks/long-form-general-strategies.mdx",
    "changelog/2025-02-27-command-r7b-arabic.mdx",
];

const IgnoreSnippetIndicator = '[ignore]';

const EmptyRunCMD = `poetry run python -c ""`;


const setApiKey = (content: string): string => {
    const apiKey = process.env.COHERE_API_KEY || DefaultAPIKey;
    const pattern = /(cohere\.ClientV?\d?\()\s*[^,)]+(\))/g;
  
    return content.replace(pattern, (match, g1, g2) => {
      return `${g1}'${apiKey}'${g2}`;
    });
  };
  

const sanitizeSnippet = (code: string): string => {
    return code
      .split('\n')
      .map((line) => {
        const trimmed = line.trimStart();
        if (trimmed.startsWith('!') || trimmed.startsWith('%')) {
          return `# ${line}`;
        }
        return line;
      })
      .join('\n');
  };
  

const extractPythonSnippets = (filePath: string): string[] => {
  const content = fs.readFileSync(filePath, 'utf8');
  const codeBlockPattern = /(`{3,4})python(?:\s+([\w\s]+))?\n([\s\S]*)\n?\1/g;

  const snippets: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = codeBlockPattern.exec(content)) !== null) {
    const modifiers = (match[2] || '').toLowerCase().split(/\s+/);
    if (modifiers.includes(IgnoreSnippetIndicator)) {
      continue;
    }
    let snippet = match[3];
  
    snippet = sanitizeSnippet(snippet);
    snippet = setApiKey(snippet);
    snippets.push(snippet);
  }

  return snippets;
};

export const execPythonSnippet = (file: string, cwd: string) => {
  if (FilesToIgnore.includes(file)) {
    return EmptyRunCMD;
  }

  if (file !== 'cohere-api/about.mdx') return EmptyRunCMD;

  const filePath = path.join(cwd, file);
  const snippets = extractPythonSnippets(filePath);
  if (snippets.length === 0) return EmptyRunCMD;

  const combinedSnippets = snippets.join("\n\n");
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'py-snippet-'));
  const tempFile = path.join(tempDir, `${randomUUID()}.py`);
  fs.writeFileSync(tempFile, combinedSnippets, 'utf8');

  return `poetry run python "${tempFile}"`;
};