---
date: '2021-01-18T01:00:00'
title: 'Yale Alarm API Scheduler'
description: "Automatically enable and disable your alarm on a schedule."
thumbnail: /static/images/rants/2021-01-18-auto-arm-yale-alarm/thumbnail.webp
icon: /static/images/rants/2021-01-18-auto-arm-yale-alarm/icon.webp
tags:
  - python
  - script
  - api
  - automation
---

I'm a big fan of the **Yale Home Alarm System**. It's been incredibly reliable and effective for
securing my home. While the hardware and connectivity are solid, there’s one key feature that’s
notably absent — **scheduling**.

Arming the system manually every night is tedious. Like many people, I rarely enter or exit my home
between **12:00 AM and 6:00 AM**, so it would be ideal for the system to automatically enter
*part-arm* mode (activating door/window sensors but leaving motion sensors disabled) during those
hours.

### The Problem

Yale's app does not offer native scheduling capabilities. Thankfully, I came across an excellent *
*Python wrapper** for the Yale API, which allows you to arm and disarm the system using your Yale
credentials.

However, I needed more than just the ability to send commands:

- A way to schedule actions automatically.
- Notifications confirming the alarm's state change.
- A persistent environment to host the script.

### The Solution

To address these needs, I created a lightweight automation setup using **Docker**, which can be
deployed on any local machine. In my case, I run it on a **Raspberry Pi 4B** that doubles as a home
NAS.

A future post will cover how to deploy this using **AWS Lambda** for a fully cloud-based solution,
but for now, here’s how to get it running locally.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/scottstraughan/yale-alarm-scheduler.git
```

### 2. Install Docker

Download and install Docker for your platform from [docker.com](https://www.docker.com).

> **Optional (Windows):** Installing [Git Bash](https://git-scm.com/downloads) is recommended for
> smoother command-line usage.

### 3. Navigate to the Project Directory

```bash
cd yale-alarm-scheduler
```

### 4. Configure Your Credentials and Schedule

Edit the `config.json` file to:

- Add your Yale account credentials
- Define your arming/disarming schedule
- (Optional) Configure **SendGrid** to receive email notifications upon state changes

> _SendGrid offers a free tier that supports hundreds of emails per month — perfect for sending
lightweight notifications._

### 5. Build the Docker Image

```bash
docker build -t yale-alarm-scheduler .
```

### 6. Run the Container

```bash
docker run --rm yale-alarm-scheduler
```

Once running, the scheduler will automatically arm or disarm your system based on the specified
configuration.

## What’s Next?

This local setup is ideal for personal use on home hardware like a Raspberry Pi. For users looking
for a **cloud-native solution**, I’ll be publishing a follow-up post demonstrating how to deploy
this project using **AWS Lambda** — enabling a truly headless, always-on automation flow.

**Stay tuned!**
