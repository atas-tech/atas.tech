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
  - *Content:* "Dictionary Lookup: **Atas** (Singlish) - High-class, sophisticated, posh. Applied to autonomous agency and secure machine intelligence."
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
  - **Call to Action Button:** A solid block button (Amber background, black text) reading `CONNECT TO GITHUB -> https://github.com/orgs/atas-tech/`.

#### **E. Footer**

- **Layout:** Simple, centered text.
- **Content:** * `CONNECTION SECURE.`
  - `© 2018 - PRESENT // ATAS.TECH`
  - Blinking cursor `_` at the very bottom.
