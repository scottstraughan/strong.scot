---
date: '2024-06-05T01:00:00'
title: 'Convert MD Files to JSON Compliant Feeds'
description: 'Open sourced a small tool that can be used to create JSON Feed compliant v1.0 feeds.'
thumbnail: /static/images/rants/2024-06-25-markdown-feeds/thumbnail.webp
icon: /static/images/rants/2024-06-25-markdown-feeds/icon.webp
tags: [jekyll, json, static-site, open-source, backend]
---

If you've ever wished for a simple, **blazing fast way to turn static markdown content into a JSON
Feed 1.0-compliant API**, then you're going to love [**MarkdownFeeds
**](https://github.com/scottstraughan/markdownfeeds).

MarkdownFeeds is an open-source tool designed to take your existing Jekyll-style markdown files (
with YAML front matter) and generate JSON feeds from them — ideal for creating headless-style APIs
from static content.

## ⚡Why MarkdownFeeds?

Modern frontend frameworks like React, Vue, or SvelteKit often need an API or data layer — even
when your site is mostly static. MarkdownFeeds bridges the gap between static site generators and
dynamic frontend applications by turning your markdown posts into a **structured, paginated JSON
feed**.

### Core Features

- **Multi-threaded**: Designed for performance from the ground up.
- **Super fast**: Handles hundreds or thousands of markdown files with ease.
- **JSON Feed 1.0 support**: Follows the [JSON Feed spec](https://jsonfeed.org/version/1).
- **Pagination built-in**: Serve feed data in chunks for better performance.
- **Customizable**: Tweak the feed output to suit your needs.
- **Great for fake dynamic backends**: Perfect when you want a static-hosted API that behaves
  dynamically.

## How It Works

MarkdownFeeds parses your Jekyll-style markdown files:

```md
---
title: "My Post"
date: 2025-07-10
tags: ["jekyll", "json"]
---

Here is some content.
```

And turns them into something like this:

```json
{
  "version": "https://jsonfeed.org/version/1",
  "title": "My Static Site Feed",
  "items": [
    {
      "id": "my-post",
      "title": "My Post",
      "content_text": "Here is some content.",
      "date_published": "2025-07-10T00:00:00Z",
      "tags": [
        "jekyll",
        "json"
      ]
    }
  ]
}
```

Use this feed in SPAs, headless CMS frontends, or anywhere you’d consume API-like content.

---

## Use Cases

- Create a **fake API backend** for your frontend project without writing a single backend route
- Build a **custom blog reader app** using React, Vue, or Flutter powered by JSON feeds
- Turn any **Jekyll-based static site** into a headless content API
- Automate content delivery to **mobile or client apps** without relying on external CMSs

## Get Started

Clone the repo:

```bash
git clone https://github.com/scottstraughan/markdownfeeds.git
cd markdownfeeds
```

Run the generator on a folder of markdown files:

```bash
python3 markdownfeeds.py ./my_markdown_posts/ --output ./feeds/
```

Configure pagination, feed metadata, and more via the CLI or configuration file.

## Example

How to take a directory of markdown files and generate a feed:

```python
from markdownfeeds.Generators.Json.JsonFeedGenerator import JsonFeedGenerator
from markdownfeeds.Generators.Json.JsonFeedGeneratorSettings import JsonFeedGeneratorSettings
from markdownfeeds.Generators.Json.Models.JsonFeed import JsonFeed

JsonFeedGenerator(
    feed=JsonFeed(title='Captain\'s Log 1'),
    generator_settings=JsonFeedGeneratorSettings(
        source_directory='../1-simple-json-feed/logs',
        target_directory='json/log1',
    )
).run_standalone()
```

## Contribute or Explore

MarkdownFeeds is fully open-source under the MIT license. Contributions, bug reports, and feedback
are welcome!

🔗 [GitHub Repository →](https://github.com/scottstraughan/markdownfeeds)

## Final Thoughts

MarkdownFeeds provides a smart middle-ground between static content and dynamic applications.
Whether you're prototyping, building lightweight frontends, or simply want to avoid the complexity
of a backend — MarkdownFeeds has you covered.

Give it a try, and start feeding your frontend with static power!
