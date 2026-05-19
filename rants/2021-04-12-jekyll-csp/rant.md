---
date: '2021-04-12T01:00:00'
title: 'Jekyll Content Security Policy Plugin'
description: "Automatically generate a content security policy based on your Jekyll site."
thumbnail: /static/images/rants/2021-04-12-jekyll-csp/thumbnail.webp
icon: /static/images/rants/2021-04-12-jekyll-csp/icon.webp
tags:
  - jekyll
  - plugin
  - open-source
  - ruby
---

Last weekend, I developed a simple yet effective Jekyll plugin called **`jekyll-csp`**. This plugin
automatically generates a `Content-Security-Policy` (CSP) `<meta>` tag by scanning the contents of
a Jekyll-generated site. It’s written in Ruby—a language that’s new to me—so while the code may not
be perfect, it’s functional and aims to solve a real-world problem.

## What Does It Do?

`jekyll-csp` analyzes your Jekyll site's output and collects all external and inline assets,
including:

- Images
- Scripts
- Stylesheets
- Frames

Based on this scan, it constructs a Content Security Policy and inserts it as a `<meta>` tag in
the `<head>` of your HTML pages. It even detects inline `<script>` and `<style>` tags, generates
the appropriate SHA-256 hashes for them, and includes these hashes in the policy, helping to guard
against XSS and similar attacks.

## Key Features

- Automatically generates policies for `script-src`, `style-src`, `img-src`, and `frame-src`
- Computes SHA-256 hashes for inline scripts and styles
- Converts `style` attributes to inline `<style>` blocks (and hashes them)
- Appends to or creates a new `<meta http-equiv="Content-Security-Policy">` tag
- Injects the policy into the HTML `<head>`
- Optionally moves inline styles and scripts to the head for better policy enforcement

## Installation

The plugin is available
via [RubyGems](https://rubygems.org/gems/jekyll-content-security-policy-generator) and can be
easily added to your Jekyll project using Bundler. Add the following to your site's `Gemfile`:

```ruby
group :jekyll_plugins do
  gem 'jekyll-content-security-policy-generator'
end
```

Then run:

```bash
bundle install
```

> ⚠️ If you encounter errors related to `nokogiri`, it may be due to conflicting architectures in
> your `Gemfile.lock`. Manually remove the incorrect versions, then try again.

## Live Demo

This very site is built with Jekyll and uses the plugin. If you view the page source, you’ll see
the generated Content Security Policy `<meta>` tag. It’s particularly helpful here since the site
contains many inline styles and scripts—ideal conditions for demonstrating the plugin’s benefits.

## Get Involved

`jekyll-csp` is
an [open-source project under the MIT license](https://github.com/strongscot/jekyll-content-security-policy-generator),
and contributions are welcome. Whether you're looking to improve the code, request features, or
report issues, head over to the GitHub repo and get involved.
