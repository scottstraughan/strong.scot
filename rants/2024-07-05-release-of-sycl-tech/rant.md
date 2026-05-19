---
date: '2023-07-05T01:00:00'
title: 'Release of SYCL.tech'
description: 'A few days ago I released sycl.tech Angular, a re-work of the old sycl.tech website.'
thumbnail: /static/images/rants/2024-07-05-release-of-sycl-tech/thumbnail.webp
icon: /static/images/rants/2024-07-05-release-of-sycl-tech/icon.webp
tags:
  - sycl
  - angular
  - typescript
  - signals
  - open-source
  - codeplay
---

![Screenshot](/static/images/rants/2024-07-05-release-of-sycl-tech/screenshot.png)

Over the past few months, I've been building something that brings together the SYCL ecosystem in a
fresh, accessible way: **[sycl.tech](https://sycl.tech)** — an open source web app for exploring,
learning, and engaging with SYCL!

Built in **Angular** with **TypeScript**, the project aims to be more than just a landing page —
it’s a living, responsive, and developer-friendly platform.

## Features at a Glance

**sycl.tech** offers a wide range of tools and content for both beginners and seasoned SYCL
developers:

- **Project Explorer** – Browse SYCL-related projects, videos, research papers, and more through
  a slick UI with full **filtering, searching, and tagging** support.
- **SYCL Playground** – Write, compile, and run SYCL code right in the browser. Inspect **console
  output** and even **view the compiled assembly**.
- **SYCL News Feed** – Stay up to date with the latest developments across the SYCL ecosystem.
- **Tutorials Section** – Learn SYCL step-by-step with approachable guides and code examples.
- **...And More** – With a growing set of features designed to make SYCL more accessible and
  collaborative.

## Built with Angular — The Tech Behind the Scenes

This project is written using the latest Angular, taking full advantage of:

- ⚡️ Angular **Signals** for reactive data flow
- 🧠 Smart **caching** for fast performance and smooth UX
- 🎨 Fully customizable **theming**
- 📱 **Responsive design** for seamless use on desktop and mobile
- 🏁 A **static site architecture** that feels dynamic

## The Architecture: Static Meets Dynamic

One of the most exciting aspects of this project is its structure:

The project is split into **two repos**:

1. [sycl.tech-website](https://github.com/codeplaysoftware/sycl.tech-website) – the Angular front-end
2. [sycl.tech-content](https://github.com/codeplaysoftware/sycl.tech-content) – the content repo, containing structured data (YAML/JSON/etc.)

When updates are made to the content repo, the front-end **automatically rebuilds** — allowing the
site to behave like a dynamic app **without requiring a backend**. This hybrid approach makes the
site fast, secure, and incredibly easy to scale and maintain.

## Open Source and Open to Contributions

The project is fully open source! If you're passionate about SYCL or want to contribute to a
cleanly architected Angular app, head over to the [GitHub repos](https://github.com/sycl-tech) and
get involved.

Whether you're writing docs, adding projects, or improving the playground — every contribution
helps.

## Try It Out

👉 [Visit sycl.tech](https://sycl.tech)  
👉 [Explore the GitHub Repos](https://github.com/codeplaysoftware/sycl.tech-website)

Thanks to everyone who's already contributed or provided feedback. This is just the beginning —
more features, tutorials, and community tools are on the way.

Happy coding! 🧵✨