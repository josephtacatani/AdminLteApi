const fs = require('fs');
const path = require('path');

// 🔹 Define the backend source directories
const sourceDirs = [
  './routes',        // API route handlers
  './middlewares',   // Middleware functions
  './utils',         // Utility functions
  './database',      // Database connections and models
];

// 🔹 Define the output file
const outputFile = './backend_code.txt';

// 🔹 File extensions to extract
const fileExtensions = ['.js', '.json', '.env', '.yaml', '.yml'];

// ✅ Function to recursively extract code into one file
function extractCode(sourcePath, outputStream) {
  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠️ Skipping: Directory not found - ${sourcePath}`);
    return;
  }

  fs.readdirSync(sourcePath).forEach((file) => {
    const fullPath = path.join(sourcePath, file);

    if (fs.statSync(fullPath).isDirectory()) {
      extractCode(fullPath, outputStream); // Recurse into directories
    } else if (fileExtensions.includes(path.extname(file))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      outputStream.write(`\n/* ===== File: ${fullPath} ===== */\n`);
      outputStream.write(content + '\n');
      console.log(`✅ Extracted: ${fullPath}`);
    }
  });
}

// ✅ Start extracting backend code
console.log('🔹 Extracting Backend source code into a single text file...');
const outputStream = fs.createWriteStream(outputFile, { flags: 'w' });

sourceDirs.forEach((dir) => extractCode(dir, outputStream));

outputStream.end(() => {
  console.log(`🎉 Backend code extraction complete! Check "${outputFile}".`);
});
