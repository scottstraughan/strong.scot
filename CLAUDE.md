# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run serve        # dev server (use this, NOT ng serve — requires generated files)
npm run build        # full production build
npm run clean        # remove all generated/dist files and restore routes.txt
npm run generate     # generate rants, memes, and gram JSON/HTML assets
npm run test         # run Karma unit tests
```

The pre-commit hook runs `npm run clean` automatically — generated files are never committed.

## Architecture

This is an Angular 19 SSR personal website. Most "data" is static content that gets compiled into JSON feeds at build time by Node.js scripts in `scripts/`, then consumed by Angular services at runtime.

### Build-time generation pipeline

`npm run generate` runs three scripts before the Angular build:

- **`generate-rants.js`** — reads `rants/<slug>/rant.md` (with YAML frontmatter: `title`, `date`, `description`, `thumbnail`, `icon`, `tags`), converts markdown → HTML, and writes `src/public/rants/feed.json`. Also copies static assets (images etc.) from each rant dir into `src/public/static/images/rants/<slug>/`.
- **`generate-memes.js`** — reads filenames from `src/public/images/memes/` and writes `src/public/images/memes/memes.json`.
- **`generate-gram.js`** — reads `gram/gram.json` and copies gram media into `src/public/images/gram/`.
- **`generate-cv.js`** — generates the CV PDF (build-only, not part of `generate`).

These outputs are gitignored; `npm run clean` removes them. The Angular app never reads raw source files directly — only the generated JSON feeds.

### Angular app structure

Services in `src/app/shared/services/` fetch the generated JSON at runtime:
- `rants.service.ts` → `/rants/feed.json`
- `memes.service.ts` → `/images/memes/memes.json`
- `gram.service.ts` → gram feed

Routes: `/` and `/gram` show `RantsComponent`; `/me` and `/about` show `MeComponent`; `/me/memes` shows `MemesComponent`; `/rants/:tag` shows `ViewRantComponent`.

### Adding new rants

Create a new directory under `rants/` named `YYYY-MM-DD-slug/` containing:
- `rant.md` with YAML frontmatter (`title`, `date`, `description`, `thumbnail`, `icon`, `tags`)
- `thumbnail.webp` and `icon.webp`
- Any other static assets referenced in the markdown

### Adding new memes

When asked to add new memes:
1. Ask for the path to the source image files.
2. Run `node scripts/generate-tidy-file-names.js <path>` on the source files — this renames them to `sha256-hash.<ext>` in place.
3. Copy the renamed files into `src/public/images/memes/`.
