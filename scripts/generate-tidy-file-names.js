#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DIR = process.argv[2];

/**
 * Recursively walk a directory, calling `callback` with the full path of each file.
 * Skips hidden files/directories and .json files.
 */
function walk(dir, callback) {
  for (const entry of fs.readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, callback);
    } else if (stat.isFile() && path.extname(entry).toLowerCase() !== ".json") {
      callback(fullPath);
    }
  }
}

const names = [];

walk(DIR, (filePath) => {
  const dir = path.dirname(filePath);
  const file = path.basename(filePath);
  const ext = path.extname(file).toLowerCase();
  const hash = crypto.createHash("sha256").update(file).digest("hex").slice(0, 16);
  const newName = `${hash}${ext}`;
  const newPath = path.join(dir, newName);

  fs.renameSync(filePath, newPath);
  names.push(path.relative(DIR, newPath));
  console.log(`${path.relative(DIR, filePath)}  →  ${path.relative(DIR, newPath)}`);
});
