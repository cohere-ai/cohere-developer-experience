const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");

const mdxDir = path.join(__dirname, "../../fern/pages");
const filePattern = /\.mdx$/;

// Counters
let totalFilesChecked = 0;
let totalFilesValid = 0;
let totalFilesInvalid = 0;

// List of folders to exclude (relative to mdxDir)
const excludedFolders = ["-ARCHIVE-", "api-reference", "llm-university"];

function shouldExcludeFolder(dirPath) {
  return excludedFolders.some((excludedFolder) => {
    return path.relative(mdxDir, dirPath).startsWith(excludedFolder);
  });
}

async function shouldExcludeFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data } = matter(fileContent);
    return data.hidden === true;
  } catch (error) {
    console.error(`Error reading file "${filePath}":`, error);
    return false; // In case of error, don't exclude the file
  }
}

async function checkDescriptionLength(filePath) {
  totalFilesChecked++;
  const fileContent = await fs.readFile(filePath, "utf8");
  const { data } = matter(fileContent);

  if (!data.description) {
    console.log(`File "${filePath}" is missing a description.`);
    totalFilesInvalid++;
    return false;
  }

  const descriptionLength = data.description.length;

  if (descriptionLength < 50 || descriptionLength > 160) {
    console.log(
      `File "${filePath}" has an invalid description length: ${descriptionLength} characters.`
    );
    totalFilesInvalid++;
    return false;
  }

  totalFilesValid++;
  return true;
}

async function checkMDXFiles(dirPath) {
  let allFilesValid = true;
  const files = await fs.readdir(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = await fs.lstat(fullPath);

    if (stat.isDirectory()) {
      if (shouldExcludeFolder(fullPath)) {
        console.log(`Skipping excluded directory: ${fullPath}`);
        continue;
      }
      const isValid = await checkMDXFiles(fullPath);
      if (!isValid) {
        allFilesValid = false;
      }
    } else if (filePattern.test(file)) {
      if (await shouldExcludeFile(fullPath)) {
        console.log(`Skipping excluded file: ${fullPath}`);
        continue;
      }
      const isValid = await checkDescriptionLength(fullPath);
      if (!isValid) {
        allFilesValid = false;
      }
    }
  }

  return allFilesValid;
}

(async () => {
  const allFilesValid = await checkMDXFiles(mdxDir);

  // Summary report
  console.log(`\nSummary Report:`);
  console.log(`Total files checked: ${totalFilesChecked}`);
  console.log(`Total valid files: ${totalFilesValid}`);
  console.log(`Total invalid files: ${totalFilesInvalid}`);

  if (!allFilesValid) {
    console.error(
      "Some files have invalid or missing descriptions. Meta description needing to be 50-160 characters"
    );
    process.exit(1); // Fail if any file is invalid
  } else {
    console.log(
      "All files have a valid description length in the frontmatter."
    );
  }
})();
