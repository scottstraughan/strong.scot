#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DIR = "./src/public/images/memes";

const names = fs.readdirSync(DIR).filter((f) => {
  return !f.startsWith(".") && path.extname(f).toLowerCase() !== ".json" && fs.statSync(path.join(DIR, f)).isFile();
});

fs.writeFileSync(path.join(DIR, "memes.json"), JSON.stringify(names, null, 2));
console.log(`memes.json written to ${DIR}`);