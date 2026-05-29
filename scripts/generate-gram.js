#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const GRAM_SOURCE_DIR = path.resolve(__dirname, '..', 'gram');
const OUTPUT_DIR = path.resolve(__dirname, '..', 'src', 'public', 'images', 'gram');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Read the structured gram.json
const sourceGramJson = JSON.parse(
  fs.readFileSync(path.join(GRAM_SOURCE_DIR, 'gram.json'), 'utf-8'),
);

// Read all image files from the gram source directory
const imageNames = fs.readdirSync(GRAM_SOURCE_DIR).filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext)
    && !f.startsWith('.')
    && fs.statSync(path.join(GRAM_SOURCE_DIR, f)).isFile();
});

// Copy all images into the public directory
for (const name of imageNames) {
  fs.copyFileSync(path.join(GRAM_SOURCE_DIR, name), path.join(OUTPUT_DIR, name));
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
  `and ${imageNames.length} images to ${OUTPUT_DIR}`,
);