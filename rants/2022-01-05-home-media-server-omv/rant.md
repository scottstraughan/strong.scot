---
date: '2022-01-05T01:00:00'
title: 'OMV Home Media Server'
description: 'A small writeup of my home media server using OpenMediaVault.'
thumbnail: /static/images/rants/2022-01-05-home-media-server-omv/thumbnail.webp
icon: /static/images/rants/2022-01-05-home-media-server-omv/icon.webp
tags: [openmediavault, self-hosting, homelab]
---

Tired of paying monthly for streaming platforms and cloud storage? I decided to take control of my
media by building a home media server using OpenMediaVault (OMV) — a free, Debian-based NAS
solution.

## Why OpenMediaVault?

- Open-source and free
- Plugin support (Docker, Plex, Transmission, etc.)
- Web UI for management
- RAID support and SMART monitoring

## Hardware I Used

- Raspberry Pi 4 (8GB RAM)
- 2x 2TB external HDDs (USB 3.0)
- 128GB SD card (for OMV)
- Gigabit Ethernet

## Installing OpenMediaVault

1. **Flash the OS**  
   Download OMV for Raspberry Pi and flash it using Rufus or Balena Etcher.

2. **Initial Setup**
   - Boot Pi
   - Find IP on your router
   - Access via browser: `http://<ip-address>`
   - Login: `admin` / `openmediavault`

3. **Configure Storage**
   - Mount your drives (under “File Systems”)
   - Create shared folders (e.g., `Movies`, `TV Shows`)

4. **Enable Services**
   - SMB for Windows shares
   - FTP or NFS for others

## Adding Plex Media Server

1. Install OMV Extras to enable plugin support.
2. Enable Docker & Portainer.
3. Deploy Plex in a container:
   - Mount your media folders
   - Map necessary ports
   - Enjoy media streaming on all devices!

## Bonus Features

- Set up automatic downloads with Transmission or qBittorrent
- Use Jellyfin if you prefer an open-source Plex alternative
- Access remotely via Tailscale or a VPN

## Final Thoughts

OpenMediaVault turned my Raspberry Pi into a full-blown media center and NAS. It's cheap,
customizable, and a fun weekend project that pays off every time I skip another streaming
subscription.
