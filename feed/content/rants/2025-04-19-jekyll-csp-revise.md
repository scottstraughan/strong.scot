---
date: '2025-04-19T01:00:00'
title: 'Reworking the jekyll-csp Plugin'
description: 'It was buggy as hell, I had to re-work it. It works better now and that is great!'
thumbnail: /static/images/rants/2025-04-19-reworking-jekyll-csp/screenshot.webp
icon: /static/images/rants/2025-04-19-reworking-jekyll-csp/icon.webp
tags:
    - jekyll
    - ruby
    - plugin
    - jekyll-csp
---

After a long-overdue refresh, I’m happy to share a significant update to my Jekyll plugin, now
renamed to jekyll-csp. Previously known as jekyll-content-security-policy-generator, this plugin
has been rebuilt with better configuration, cleaner output, and a more focused purpose.

The goal of jekyll-csp is simple: to make it easier for Jekyll users to generate secure, flexible
Content Security Policy (CSP) tags directly from their static site build. The latest version takes
that idea further with a set of improvements that should make it easier to integrate, customize,
and debug.

## What’s New

The updated version of jekyll-csp introduces several new features, all aimed at improving control
over how your CSP tags are generated:

- **Custom Indentation and Newlines:**
  You can now specify how the plugin formats the generated <meta> tag, giving you fine-grained 
  control over whitespace, indentation style, and line breaks.
- **Debug Mode:**
  Toggle debug mode on or off to output detailed logs during generation — useful for development and 
  troubleshooting.
- **More Tag Customization:**
  It’s now easier to tweak the tag attributes themselves, giving you flexibility in how CSP is
  delivered in your HTML.
- **Cleaner Codebase:**
  Internally, the code has been simplified and better structured, making future changes and community 
  contributions easier.

## Open Source and Available Now

jekyll-csp is fully open-source and available on GitHub:

https://github.com/scottstraughan/jekyll-csp

You’ll find documentation, configuration examples, and everything you need to get started.

## Why the Name Change?

The original name — jekyll-content-security-policy-generator — was functional but clunky. The new
name, jekyll-csp, is more concise, easier to type, and better reflects the goal of the plugin:
generating CSP headers for Jekyll sites in a clean and user-friendly way.

## Try It, Use It, Improve It

If you’re building a Jekyll site and care about security (and you should), jekyll-csp is designed
to be a simple but powerful addition to your toolchain. I’d love for others to try it out, open
issues, contribute improvements, or just share feedback.

Thanks to everyone who’s used the plugin over the years — and here’s to a more secure web,
one <meta> tag at a time.