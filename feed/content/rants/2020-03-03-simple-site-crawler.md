---
date: '2021-04-12T01:00:00'
title: 'Simple Website Crawler'
description: "Automatically generate a content security policy based on your Jekyll site."
thumbnail: /static/images/rants/2020-03-03-simple-site-crawler/thumbnail.webp
icon: /static/images/rants/2020-03-03-simple-site-crawler/icon.webp
tags:
  - python
  - script
  - crawler
  - threaded
---

While working on a recent task that involved validating redirections for a large set of internal
URLs, I encountered a familiar challenge — manually checking thousands of URLs just wasn’t
scalable. To streamline the process, I began prototyping a solution outside of work. What started
as a quick experiment soon evolved into a personal side project, now open-sourced as *
*SiteUrlCrawler** — a user-friendly, highly configurable Python-based URL crawler.

## Designed for Simplicity and Flexibility

From the outset, usability was a key priority. The crawler is designed to run with minimal setup —
requiring just one import and two lines of code to get started. At the same time, it includes
optional parameters for advanced use cases, allowing users to tailor the crawling behavior to meet
specific requirements.

## Performance and Filtering Features

Early in development, it became clear that a single-threaded approach — fetching one page at a time
and extracting links sequentially — was insufficient for large-scale tasks. To improve performance,
I implemented multithreading, enabling concurrent processing and significantly reducing crawl
times.

The core `crawl()` method has also been enhanced to support **mode-based URL filtering**, giving
users the ability to extract:

- Internal URLs
- External URLs
- Both internal and external URLs

This provides a flexible and efficient way to audit a website’s link structure.

## Quick Start

To begin using `SiteUrlCrawler`, simply import the class and start crawling:

```python
from SiteUrlCrawler import SiteUrlCrawler

crawler = SiteUrlCrawler("https://strong.scot")

for url in crawler.crawl():
    print("Found: " + url)
```

The `crawl()` method returns a list of all discovered URLs.

## Filtering by URL Type

To limit the crawl to specific URL types, pass one of the following mode constants to the `crawl()`
method:

- `SiteUrlCrawler.Mode.INTERNAL` – Extract only internal URLs
- `SiteUrlCrawler.Mode.EXTERNAL` – Extract only external URLs
- `SiteUrlCrawler.Mode.ALL` – Extract both internal and external URLs

Example usage:

```python
for url in crawler.crawl(SiteUrlCrawler.Mode.INTERNAL):
    print("Found: " + url)
```

## Crawling Scope

By design, `SiteUrlCrawler` avoids deep traversal of external URLs. The primary focus is on
auditing internal site navigation rather than emulating a full web crawler. However, the codebase
is straightforward and can be extended to support broader crawling behavior if needed.

## Source Code

The project is open source and available on GitHub:  
🔗 [https://github.com/scottstraughan/simple-python-url-crawler](https://github.com/strongscot/simple-python-url-crawler)
