/* eslint no-console: "off" */
/* eslint @typescript-eslint/no-unsafe-argument: "off" */

const fs = require('fs');
const path = require('path');

// Check if the correct number of arguments are passed
if (process.argv.length !== 4) {
  console.log(
    `Usage: node ${path.basename(__filename)} <root_directory> <output_file>`,
  );
  process.exit(1);
}

const rootDirectory = process.argv[2];
const outputFile = process.argv[3];

// Create or clear the output file
fs.writeFileSync(outputFile, '');

console.log(
  `Starting concatenation of md files from '${rootDirectory}' directory.`,
);

// Find all .md files and concatenate their contents
function processDirectory(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(directory, dirent.name);
    if (dirent.isDirectory() && !['node_modules'].includes(dirent.name)) {
      processDirectory(fullPath);
    } else if (
      dirent.isFile() &&
      ['.md', '.mdx'].includes(path.extname(dirent.name))
    ) {
      console.log(`Adding file: ${fullPath}`);
      const data = fs.readFileSync(fullPath, 'utf8');
      fs.appendFileSync(outputFile, `File: ${fullPath}\n\n${data}\n`);
    }
  });
}

processDirectory(rootDirectory);

console.log(`Concatenation complete. Output is in ${outputFile}`);
