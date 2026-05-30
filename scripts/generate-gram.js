#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const GRAM_SOURCE_DIR = path.resolve(__dirname, '..', 'gram');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'src', 'public', 'images', 'gram');

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Read the structured gram.json
const sourceGramJson = JSON.parse(
  fs.readFileSync(path.join(GRAM_SOURCE_DIR, 'gram.json'), 'utf-8'),
);

// Collect all referenced filenames from the JSON
const referencedFiles = new Set(
  sourceGramJson.posts
    .filter(post => post.attached && post.attached.url)
    .map(post => post.attached.url),
);

// Copy all referenced files into the public directory
let copiedCount = 0;
for (const name of referencedFiles) {
  const sourcePath = path.join(GRAM_SOURCE_DIR, name);
  if (fs.existsSync(sourcePath) && fs.statSync(sourcePath).isFile()) {
    fs.copyFileSync(sourcePath, path.join(OUTPUT_DIR, name));
    copiedCount++;
  } else {
    console.warn(`Warning: referenced file not found: ${name}`);
  }
}

// Patch the attachment urls to include the correct public path
for (const post of sourceGramJson.posts) {
  if (post.attached && post.attached.url) {
    post.attached.url = `/images/gram/${post.attached.url}`;
  }
}

// Write the patched json manifest
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'gram.json'),
  JSON.stringify(sourceGramJson, null, 2),
);

console.log(
  `gram.json written with ${sourceGramJson.posts.length} posts ` +
  `and ${copiedCount} files to ${OUTPUT_DIR}`,
);