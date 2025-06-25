// Remove the old static files since we're now using React + Vite
const fs = require("fs");
const path = require("path");

const filesToRemove = [
  "package-lock.json", // Old package-lock from static version
  "README.md", // Will be updated with React info
];

filesToRemove.forEach((file) => {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Removed: ${file}`);
  }
});

console.log("Cleanup complete!");
