#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
// `marked` is ESM-only in newer versions. Import it dynamically inside
// the async `main()` so the script works in CommonJS/CI environments.

const ROOT = path.resolve(__dirname, '..');
const SOURCE_ROOT = path.join(ROOT, 'rants');
const PUBLIC_RANTS_DIR = path.join(ROOT, 'src', 'public', 'rants');
const PUBLIC_STATIC_IMAGES_DIR = path.join(ROOT, 'src', 'public', 'static', 'images', 'rants');

function parseFrontmatter(text) {
  const result = { meta: {}, body: text };
  if (!text.startsWith('---')) {
    return result;
  }

  const endIndex = text.indexOf('\n---', 3);
  if (endIndex === -1) {
    return result;
  }

  const frontmatterText = text.slice(3, endIndex).trim();
  const bodyText = text.slice(endIndex + 4).trimStart();
  const lines = frontmatterText.split(/\r?\n/);

  let currentKey = null;
  for (const line of lines) {
    const listItem = line.match(/^\s*-\s*(.*)$/);
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (listItem && currentKey) {
      if (!Array.isArray(result.meta[currentKey])) {
        result.meta[currentKey] = [];
      }
      result.meta[currentKey].push(listItem[1].trim());
      continue;
    }

    if (field) {
      const key = field[1].trim();
      const value = field[2].trim();
      currentKey = key;
      if (value === '') {
        result.meta[key] = [];
      } else {
        const normalized = value.replace(/^'(.*)'$/, '$1').replace(/^"(.*)"$/, '$1');
        result.meta[key] = normalized;
      }
    } else {
      currentKey = null;
    }
  }

  return { meta: result.meta, body: bodyText };
}

async function ensureEmptyDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  const { marked } = await import('marked');
  await ensureEmptyDir(PUBLIC_RANTS_DIR);
  await ensureEmptyDir(PUBLIC_STATIC_IMAGES_DIR);

  const entries = await fs.readdir(SOURCE_ROOT, { withFileTypes: true });
  const slugs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .reverse();

  const routes = ['/rants'];
  const items = [];

  for (const slug of slugs) {
    const slugDir = path.join(SOURCE_ROOT, slug);
    const entries = await fs.readdir(slugDir, { withFileTypes: true });
    const markdownEntry = entries.find((entry) => entry.isFile() && entry.name.endsWith('.md'));

    if (!markdownEntry) {
      continue;
    }

    const markdownFile = path.join(slugDir, markdownEntry.name);
    const sourceText = await fs.readFile(markdownFile, 'utf8');
    const { meta, body } = parseFrontmatter(sourceText);
    const html = marked.parse(body);

    const targetStaticDir = path.join(PUBLIC_STATIC_IMAGES_DIR, slug);
    await fs.rm(targetStaticDir, { recursive: true, force: true });
    await fs.mkdir(targetStaticDir, { recursive: true });

    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        continue;
      }

      await fs.cp(
        path.join(slugDir, entry.name),
        path.join(targetStaticDir, entry.name),
        { recursive: true }
      );
    }

    const item = {
      id: slug,
      tag: slug,
      _tag: slug,
      title: meta.title || slug,
      description: meta.description || '',
      url: `/rants/${slug}`,
      thumbnail: meta.thumbnail || `/static/images/rants/${slug}/thumbnail.webp`,
      icon: meta.icon || `/static/images/rants/${slug}/icon.webp`,
      body: html,
      date: meta.date || '',
      _content: html,
      _date: meta.date || '',
      _description: meta.description || '',
      _thumbnail: meta.thumbnail || `/static/images/rants/${slug}/thumbnail.webp`,
      _icon: meta.icon || `/static/images/rants/${slug}/icon.webp`,
      external_url: `/rants/${slug}`,
    };

    items.push(item);
    routes.push(`/rants/${slug}`);
  }

  const feedJson = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Rants',
    home_page_url: '/',
    feed_url: '/rants/feed.json',
    _total_items: items.length,
    _total_pages: 1,
    _items_on_page: items.length,
    items,
  };

  await fs.writeFile(path.join(PUBLIC_RANTS_DIR, 'feed.json'), JSON.stringify(feedJson, null, 2), 'utf8');

  // Read existing routes.txt and merge, deduplicating entries
  const routesTxtPath = path.join(ROOT, 'routes.txt');
  let existingRoutes = [];
  try {
    const existing = await fs.readFile(routesTxtPath, 'utf8');
    existingRoutes = existing.split('\n').filter(Boolean);
  } catch {
    // File doesn't exist yet, start fresh
  }

  const mergedRoutes = [...new Set([...existingRoutes, ...routes])];
  await fs.writeFile(routesTxtPath, mergedRoutes.join('\n') + '\n', 'utf8');

  console.log(`Built ${items.length} rants and wrote ${mergedRoutes.length} routes.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});