# ATAS.TECH

Sophisticated architectural patterns and high-fidelity machine intelligence.

## Overview

ATAS (adj.) – Derived from Malay, meaning 'upper' or 'above'. In colloquial use: sophisticated, high-end, or high-class.

atas.tech is a boutique AI research laboratory in Singapore. It is the hub for encrypted secret handoff for AI agents, supply-chain guardrails for agentic coding, trust tooling plus Quickshell bar plugins for Omarchy Linux, and device companions for SteamOS and herdr.

## Project Est. 2018

Originally allocated for high-end AI protocols, atas.tech serves as the hub for advanced research and development.

### Latest: OmaSafe

- **OmaSafe CLI** (Rust, v0.3.3) — bounded, evidence-first review of Omarchy plugins, host posture, and pre-install candidates. [github.com/tuthan/omasafe](https://github.com/tuthan/omasafe)
- **OmaSafe plugin** (v0.5.1) — Omarchy bar widget and review panel over the CLI. [github.com/tuthan/omasafe-plugin](https://github.com/tuthan/omasafe-plugin)
- **OmaSafe Agent Skill** (v1.4.1) — portable skill for Claude Code, Codex, Cursor, and OpenCode. [github.com/tuthan/omasafe-agent-skill](https://github.com/tuthan/omasafe-agent-skill)

### Omarchy plugins

- **Dropdown Terminal** (v2.3.0) — [github.com/tuthan/omarchy-dropdown-terminal](https://github.com/tuthan/omarchy-dropdown-terminal)
- **OmaSafe** (v0.5.1) — [github.com/tuthan/omasafe-plugin](https://github.com/tuthan/omasafe-plugin)
- **Unraid** (v1.0.1) — [github.com/tuthan/omarchy-unraid](https://github.com/tuthan/omarchy-unraid)
- **Lunar Calendar** (v1.1.0) — [github.com/tuthan/omarchy-lunar-calendar](https://github.com/tuthan/omarchy-lunar-calendar)

### Agent security

- **BlindPass** — self-hosted encrypted credential handoff for AI agents (the hosted SPS service is retired). [blindpass.atas.tech](https://blindpass.atas.tech)
- **BlindDrop** — one-time, self-destructing secret sharing. [blinddrop.atas.tech](https://blinddrop.atas.tech)
- **Dependency Guard** — dependency-review guardrail for agentic coding. [clawhub.ai/tuthan/dependency-guard](https://clawhub.ai/tuthan/dependency-guard)

### Companions

- **SteamOS Companion** (Decky v0.5.18, Omarchy client v0.5.14) — control and monitor one SteamOS device from another. [steamos-companion.atas.tech](https://steamos-companion.atas.tech)
- **Paddock** (host plugin v0.2.0, Android app in testing) — answer the agents in your herdr sessions from a phone over SSH. [product page](https://tuthan.github.io/herdr-plugin-paddock/)

### Coming soon

- **Kids App** — educational iOS app for early cognitive development.
- **Coffee Branch** — decentralized coffee supply chain platform.

## Local Development

To view the landing page locally:

1. Clone the repository:
   ```bash
   git clone git@github.com:atas-tech/atas.tech.git
   ```
2. Open `index.html` in your browser (or serve the folder with `python3 -m http.server`).

Project cards carry `data-slug`, `data-name`, `data-url`, and `data-status` attributes; cards that are Omarchy plugins also carry `data-omarchy="listed"` once they are on the marketplace. The hero terminal, the stats bar, and the totals line read those attributes at runtime, so adding a card is enough to keep them in sync. Version strings are written by hand in the card badges, the JSON-LD, `script.js` (`pluginRows`), `llms.txt`, and this file; grep for the old version when bumping one.

Thumbnails live in `assets/` as WebP; regenerate them from the source repositories with ImageMagick (`magick preview.png -resize 960x -quality 80 assets/<name>.webp`).

## Tech Stack

- **HTML5**: Semantic structure with JSON-LD for the organization and project list.
- **Vanilla CSS**: Retro-terminal aesthetic with CRT scanlines, vignette, and phosphor-tinted screenshots.
- **JavaScript**: Boot sequence, live scripted terminal with a small command set, reveal-on-scroll, copyable install commands. No dependencies.
- **GitHub Actions**: Automated deployment to GitHub Pages.

---
© 2018-2026 ATAS.TECH / SG_LAB_01
