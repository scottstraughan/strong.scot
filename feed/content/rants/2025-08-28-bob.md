---
date: '2025-08-28T01:00:00'
title: 'Bob AI Assistant'
description: 'Bob has now been developed as is living along side us, helping Saosail users!'
thumbnail: /static/images/rants/2025-08-28-bob/thumbnail.webp
icon: /static/images/rants/2025-08-28-bob/icon.webp
tags:
  - Bob
  - OpenAI
  - LLM
  - Saorsail
  - Express JS
  - Node.js
---

<video controls muted autoplay>
  <source src="/static/images/rants/2025-08-28-bob/bob.mp4" type="video/mp4">
Your browser does not support the video tag.
</video>

Every good website deserves a friendly face. On saorsail.com, that face belongs to Bob—our
cheerful, slightly quirky assistant powered by OpenAI’s ChatGPT. Bob isn’t just here to answer
questions; he’s built to help you discover apps, guide you through your journey on Saorsail, and
maybe even make you smile along the way.

But Bob isn’t just a single piece of software. He’s a collection of components working together to
create a smooth, chat-based experience. Let’s break it down.

## [Bob's Brain 🧠](https://github.com/scottstraughan/bob-brain)

At the core of Bob’s personality and logic is the aptly named Bob Brain. This is a Node.js server
running on Express that acts as the central nervous system. It takes in user questions,
communicates with OpenAI’s ChatGPT, and returns helpful responses.

Think of Bob Brain as the “control tower.” It’s where the magic happens—processing requests,
orchestrating data, and making sure Bob always has something useful (or funny) to say.


## [ngx-bob 💬](https://github.com/scottstraughan/ngx-bob)

What’s a brain without a mouth? That’s where ngx-bob comes in.

ngx-bob is a custom Angular chat component, built specifically for Saorsail. It’s the interface
that lets you talk with Bob, see his responses, and browse through your message history.

The goal here is simple: chatting with Bob should feel natural, lightweight, and enjoyable. ngx-bob
handles the front-end magic so that every conversation flows smoothly.


## [Embedding Layer 🔎](https://github.com/scottstraughan/saorsail-popular-db/blob/main/src/embeddings/__init__.py)

Of course, Bob wouldn’t be very helpful if he couldn’t remember or search for information. That’s
why he’s backed by an embedding layer.

This layer generates searchable embeddings, which are like maps of meaning. Instead of searching
through apps by keyword alone, Bob can understand context and intent. That means when you ask,
“What’s a good tool for managing projects?” Bob doesn’t just look for the word “project”—he
actually knows you’re looking for productivity and collaboration apps.

It’s this combination of AI smarts and embeddings that makes Bob much more than a glorified search
bar.


## Why Bob?

Because finding apps shouldn’t feel like work. Bob takes a conversational approach—whether you want
to explore new tools, troubleshoot a problem, or just ask him something random. He’s powered by
some serious tech, but his personality makes the experience approachable.

And since Bob is open-source at heart (with components like Bob Brain and ngx-bob available on
GitHub), developers can see how he works under the hood—and maybe even contribute.


## Chat with Bob Today

Next time you visit saorsail.com, don’t just browse—start a chat with Bob. Ask him to find you an
app, tell him your problems, or just see what kind of witty reply he comes up with.

He’s smart, he’s helpful, and he’s always ready for a chat.

[So go on—say hi to Bob.](https://saorsail.com)
