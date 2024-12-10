const fs = require("fs").promises;
const path = require("path");
const matter = require("gray-matter");

const mdxDir = path.join(__dirname, "../../fern/pages");
const filePattern = /\.mdx$/;

// Counters
let totalFilesChecked = 0;
let totalFilesValid = 0;
let totalFilesInvalid = 0;

// List of validators to run
const validators = [checkDescriptionLength, checkTitleLength];

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
  const fileContent = await fs.readFile(filePath, "utf8");
  const { data } = matter(fileContent);
  const minDescriptionLength = 50;
  const maxDescriptionLength = 160;

  if (!data.description) {
    console.error(`File "${filePath}" is missing a description.`);
    return false;
  }

  const descriptionLength = data.description.length;

  if (descriptionLength < minDescriptionLength || descriptionLength > maxDescriptionLength) {
    console.error(
      `File "${filePath}" has an invalid description length: ${descriptionLength} characters. ` +
      `Description should be between ${minDescriptionLength}-${maxDescriptionLength} characters.`
    );
    return false;
  }

  return true;
}


async function checkTitleLength(filePath) {
    // these two files are layout files 
    // and we don't expect to have title in them
    const filesToExclude = ["index.mdx", "cookbooks.mdx"];
    
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data } = matter(fileContent);
    const minTitleLength = 30;
    const maxTitleLength = 60;

    filePath = path.relative(mdxDir, filePath);

    if (!data.title) {
        if (filesToExclude.includes(filePath)) {
            return true;
        }
        console.error(`File "${filePath}" is missing a title.`);
        return false;
    }

    const titleLength = data.title.length;
    if (titleLength < minTitleLength || titleLength > maxTitleLength) {
        console.warn(
            `File "${filePath}" has an invalid title length: ${titleLength} characters. ` +
            `Title should be between ${minTitleLength}-${maxTitleLength} characters.`
        );
        return true;
    }

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
      let isValid = true;

      for (const validate of validators) {
        const fileIsValid = await validate(fullPath);
        if (!fileIsValid) {
            isValid = false; 
        }
      }
      
      totalFilesChecked++;
      if (!isValid) {
        allFilesValid = false;
        totalFilesInvalid++;
      }
      else {
        totalFilesValid++;
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
      "Some files have invalid or missing content."
    );
    process.exit(1); // Fail if any file is invalid
  } else {
    console.log(
      "All files a valid for frontmatter."
    );
  }
})();
