const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const mdxDir = path.join(__dirname, "../../fern/pages");
const filePattern = /\.mdx$/;

console.log("Checking MDX files...", mdxDir);

function checkDescription(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);

  if (!data.description) {
    console.error(
      `Error: The file "${filePath}" does not have a description in the frontmatter.`
    );
    return false;
  }
  if (data.description.length < 50) {
    console.error(
      `Error: The description in "${filePath}" is too short. It should be at least 50 characters long.`
    );
    return false;
  }
  if (data.description.length > 160) {
    console.error(
      `Error: The description in "${filePath}" is too long. It should be at most 160 characters long.`
    );
    return false;
  }
  return true;
}

function checkMDXFiles() {
  let allFilesValid = true;

  fs.readdirSync(mdxDir).forEach((file) => {
    const fullPath = path.join(mdxDir, file);
    if (filePattern.test(file) && fs.lstatSync(fullPath).isFile()) {
      const isValid = checkDescription(fullPath);
      if (!isValid) {
        allFilesValid = false;
      }
    }
  });

  if (!allFilesValid) {
    process.exit(1);
  }
}

checkMDXFiles();
