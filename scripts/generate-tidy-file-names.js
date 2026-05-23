#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const DIR = process.argv[2];

const files = fs.readdirSync(DIR).filter((f) => {
  return !f.startsWith(".") && path.extname(f).toLowerCase() !== ".json" && fs.statSync(path.join(DIR, f)).isFile();
});

const names = [];

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const hash = crypto.createHash("sha256").update(file).digest("hex").slice(0, 16);
  const newName = `${hash}${ext}`;

  fs.renameSync(path.join(DIR, file), path.join(DIR, newName));
  names.push(newName);
  console.log(`${file}  →  ${newName}`);
}
