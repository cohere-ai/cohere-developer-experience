const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Counters
let totalFilesChecked = 0;
let totalFilesValid = 0;
let totalFilesInvalid = 0;
let totalFilesUpdated = 0;

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

async function generateMetaDescription(content) {
  const apiKey = process.env.COHERE_TOKEN;
  const prompt = `Write a short meta description for the following article content: "${content}". The description should be between 15-25 words and only one sentence. Write only description. Do not include any URLs or code snippets.`;

  try {
    const response = await fetch("https://stg.api.cohere.com/v1/chat", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        message: prompt,
        model: "command-r-plus",
        temperature: 1,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Cohere API request failed");
    }

    const data = await response.json();

    return data.text;
  } catch (error) {
    console.error("Error generating meta description:", error.message);
    return null;
  }
}

async function updateDescription(data, content, filePath) {
  const updatedData = { ...data };
  let updated = false;

  updatedData.description = await generateMetaDescription(content);
  updated = true;

  if (updated) {
    console.log(`Updating description in "${filePath}".`);
    const updatedContent = matter.stringify(content, updatedData);
    await fs.writeFile(filePath, updatedContent, "utf8");
    totalFilesUpdated++;
  }
  return updated;
}
let numOfChecks = 0;

async function checkDescription(filePath) {
  totalFilesChecked++;
  numOfChecks++;
  const fileContent = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(fileContent);
  if (numOfChecks > 5) {
    console.error(
      `Limit of generations reached for file: : ${filePath} 
      Description needs to be updated manually.
      Update the description in the frontmatter of the file.
      Maximum character limit is 160 and minimum is 50.`
    );
    numOfChecks = 0;
    return false;
  }
  if (!data.description) {
    totalFilesInvalid++;
    // file doesn't have description
    await updateDescription(data, content, filePath);
    // recursively check the updated file
    return checkDescription(filePath);
  }
  if (data.description.length < 50) {
    totalFilesInvalid++;
    // file description is too short
    await updateDescription(data, content, filePath);
    // recursively check the updated file
    return checkDescription(filePath);
  }
  if (data.description.length > 160) {
    totalFilesInvalid++;
    // file description is too long
    await updateDescription(data, content, filePath);
    // recursively check the updated file
    return checkDescription(filePath);
  } else {
    totalFilesValid++;
  }
  numOfChecks = 0;
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
        continue; // Skip this directory
      }
      // Recursively check subdirectories
      const isValid = await checkMDXFiles(fullPath);
      if (!isValid) {
        allFilesValid = false;
      }
    } else if (filePattern.test(file)) {
      // Skip files with hidden: true
      if (await shouldExcludeFile(fullPath)) {
        console.log(`Skipping excluded file: ${fullPath}`);
        continue; // Skip this file
      }
      // Check .mdx files
      const isValid = await checkDescription(fullPath);
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
  console.log(`Total files updated: ${totalFilesUpdated}`);

  if (!allFilesValid) {
    process.exit(1); // Fail if any file is invalid
  } else {
    console.log("All files have a valid description in the frontmatter.");
  }
})();
