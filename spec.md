This spec leans into the 1980s retro-terminal aesthetic while structuring the layout for a modern, high-end AI and autonomous agent portfolio.

### **1. Global Design System (The "Atas" Terminal Theme)**

Input these core design tokens into your CSS or UI generator to establish the retro atmosphere.

- **Backgrounds:** Deep space/terminal black (`#0A0D14`). Add a subtle CSS radial gradient to mimic a CRT screen glow.
- **Primary Accent (Amber/Gold):** `#E5A93D` (Use for headings, active links, and terminal prompts like `>_`). Add a slight `text-shadow: 0 0 5px #E5A93D` for a phosphor glow effect.
- **Secondary Accent (Muted Blue):** `#2A5A85` (Use for borders, grid lines, and secondary text).
- **Typography:** * *Primary Font:* `VT323`, `Fira Code`, or `JetBrains Mono`. Everything must be monospaced to maintain the terminal illusion.
  - *Text styling:* Uppercase for headers, standard casing for paragraph text.
- **UI Elements:** * Sharp, 0px border-radius corners.
  - Borders should be solid `1px` or use ASCII-style decorative framing (`+---+`).

------

### **2. Layout Architecture & Component Specs**

#### **A. Navigation Bar (Top)**

- **Layout:** Flexbox, space-between, sticky top. Bottom border `1px solid #2A5A85`.
- **Left Side (Brand):** The standalone Mountain-Arrow avatar (scaled down to 32x32px) next to the text `atas.tech`.
- **Right Side (Links):** Formatted like terminal commands.
  - `[ ./home ]`
  - `[ ./projects ]`
  - `[ ./github ]`

#### **B. Hero Section (The Genesis)**

- **Layout:** Centered, large padding (min-height: 70vh).
- **Visual:** A large, crisp SVG version of the Atas logo.
- **Headline:** Typewriter-effect animation typing out: `> INITIALIZING PROJECT ATAS...`
- **Definition Block (Floating Terminal Window):**
  - *UI:* A box with a 1px amber border.
  - *Content:* "Dictionary Lookup: **Atas** (Singlish) - High-class, sophisticated, posh. Applied to forging autonomous protocols and sophisticated AI architectures for the next epoch."
- **Backstory Tag:** Small, muted blue text at the bottom: `SYS_LOG: Domain registered 2018. Originally allocated for [high.tech]. Repurposed for high-end AI protocols.`

#### **C. Project Showcase (The Lab)**

- **Layout:** CSS Grid (1 column on mobile, 2 on desktop).
- **Section Header:** `> ls -la /projects/active`
- **Card UI (The "BlindPass" Spec):**
  - *Container:* Dark grey background (`#11151C`) with a `1px solid #2A5A85` border. On hover, the border turns Amber (`#E5A93D`) and pushes up slightly (-2px translateY).
  - *Project Title:* `[ PROJECT: BLINDPASS ]` (Amber, bold).
  - *Status Badge:* `[STATUS: ONLINE]` (Green text).
  - *Description:* "Secure infrastructure and secret management protocols for autonomous AI agents. Ensuring high-grade operational security and robust deployment for agentic workflows."
  - *Link/Button:* `> EXECUTE blindpass.atas.tech` (Hyperlinked).

#### **D. GitHub Integration (The Engine Room)**

- **Layout:** Full-width banner section with a distinct background (e.g., repeating subtle circuit board pattern or a CSS grid background).
- **Content:**
  - Icon: Retro pixelated GitHub Octocat.
  - Headline: `> ACCESS OPEN SOURCE REPOSITORIES`
  - Text: "Review the source code, development operations, and infrastructure components powering the Atas ecosystem."
  - **Call to Action Button:** A solid block button (Amber background, black text) reading `CONNECT TO GITHUB -> https://github.com/atas-tech/`.

#### **E. Footer**

- **Layout:** Simple, centered text.
- **Content:** * `CONNECTION SECURE.`
  - `© 2018 - PRESENT // ATAS.TECH`
  - Blinking cursor `_` at the very bottom.

------

## 3. Revision — 2026-09-10 layout

The single-column brief above described the first build. The site now uses a wider,
showcase-oriented structure. Design tokens, palette, and the retro-terminal language are
unchanged; secondary body copy moved off pure amber onto `--dim` (`#8DA0B5`) for contrast.

### Page order

1. **Hero (two columns, 1100px)** — left: eyebrow, typewriter headline, definition terminal box,
   two calls to action. Right: a live terminal that types a scripted `whoami` / `ls /projects` /
   `omarchy plugin list` / `cat /etc/motd` session, then accepts input
   (`help`, `ls`, `cat <project>`, `open <project>`, `plugins`, `whoami`, `uptime`, `date`,
   `pwd`, `clear`, `neofetch`, arrow-key history, Ctrl+L). Below both: a four-cell stats bar
   that counts up on reveal, then the SYS_LOG backstory line.
2. **`> cat /projects/latest/omasafe`** — one featured card: a full-width panel screenshot
   banner, then a two-column body (copy and review surfaces on the left; release metadata,
   stack chips, and actions on the right) with the verified install command spanning both.
3. **`> ls -la /projects/omarchy-plugins`** — two-column grid of four plugin cards, each with a
   16:9 screenshot, plugin ID, tags, a copyable `omarchy plugin add` command, and marketplace link.
4. **`> ls -la /projects/agent-security`** — two-column grid of four cards (BlindPass, BlindDrop,
   Dependency Guard, OmaSafe Agent Skill).
5. **`> ls -la /projects/coming-soon`** — dashed-border pending cards.
6. **`> whoami`** — operator strip linking to the portfolio.
7. **GitHub banner** with both organizations, then the footer.

### Component rules added

- **Corner brackets** (`.bracket`) on panels and cards; they grow from 14px to 26px on hover.
- **Screenshots** (`.shot`) are phosphor-tinted at rest (`sepia`/`hue-rotate`) with a scanline
  overlay, and resolve to full colour on hover.
- **Copy buttons** (`.cmdbox` + `[data-copy]`) copy install commands with a clipboard fallback.
- **Boot overlay** plays a short BIOS sequence once per session; any key or click skips it.
- Project cards carry `data-slug`, `data-name`, `data-url`, and `data-status`. The terminal,
  the stats bar, and the totals line derive their content from those attributes, so adding a
  card keeps everything in sync.
- `prefers-reduced-motion` disables the boot sequence, typewriter, reveals, and count-ups.
