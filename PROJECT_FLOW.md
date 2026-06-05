# Project Flow — Nitheesh Edla Portfolio

A complete walkthrough of how this Next.js portfolio app is structured, how it starts up,
how data flows through components, and how each section renders on screen.

---

## Tech Stack at a Glance

| Concern        | Choice                                      |
|----------------|---------------------------------------------|
| Framework      | Next.js 16 (App Router)                     |
| Language       | JavaScript (no TypeScript)                  |
| Styling        | CSS Modules + global CSS variables          |
| Fonts          | Inter (body) + JetBrains Mono (code/numbers)|
| Hosting target | Vercel / AWS Amplify / Netlify              |

---

## Directory Structure

```
portfolio/
├── app/
│   ├── layout.js          # Root HTML shell, metadata, font imports
│   ├── page.js            # Single page — composes all sections
│   └── globals.css        # Design system: CSS variables, keyframes, utilities
│
├── components/
│   ├── Navbar.js / .css           # Fixed top nav with scroll + mobile state
│   ├── Hero.js / .css             # Landing section with canvas animation
│   ├── Projects.js / .css         # Section shell — renders ProjectCard list
│   ├── ProjectCard.js / .css      # Individual project card (reusable)
│   ├── ExperienceTimeline.js/.css # Work history + certifications + education
│   ├── SkillsGrid.js / .css       # Tech categories displayed as pill cards
│   ├── Contact.js / .css          # Contact links section
│   └── Footer.js / .css           # Copyright + footer nav
│
├── public/                # Static assets (resume PDF goes here)
├── next.config.mjs        # Next.js config (currently default/empty)
├── package.json           # Dependencies: next, react, react-dom
└── .gitignore             # Excludes node_modules, .next, sensitive files
```

---

## Startup Flow

```
npm run dev  (or  npm run build && npm start)
        │
        ▼
Next.js reads app/layout.js
        │  — sets <html lang="en">
        │  — injects Google Fonts <link> tags (Inter + JetBrains Mono)
        │  — applies globals.css to the entire document
        │
        ▼
Next.js renders app/page.js into layout's {children}
        │
        ▼
Page mounts components in this order:
  1. <Navbar />
  2. <main>
       <Hero />
       <Projects />
       <ExperienceTimeline />
       <SkillsGrid />
       <Contact />
     </main>
  3. <Footer />
```

Because this is a **single-page app with no API routes**, the entire site is
pre-rendered as static HTML at build time (`○ Static` in the build output).
No server is needed at runtime — it can be served from a CDN.

---

## Design System (globals.css)

All visual tokens live as CSS custom properties on `:root`. Every component
reads these variables — nothing is hardcoded.

```
Color roles
  --bg-primary    #0a0f1e   deepest background (hero, experience, contact)
  --bg-secondary  #0f1629   slightly lighter (projects, skills, footer)
  --bg-card       #111827   card surfaces
  --bg-card-hover #1a2540   card hover state
  --border        #1e3a5f   default borders
  --border-accent #00d4ff40 glowing borders on hover
  --accent        #00d4ff   electric cyan — headlines, badges, highlights
  --accent-2      #7c3aed   purple — used in gradients alongside accent
  --text-primary  #f0f6ff   headings and important text
  --text-secondary #94a3b8  body copy and descriptions
  --text-muted    #4a5a70   timestamps, labels, minor metadata

Typography
  --font-sans    Inter, system-ui    body text
  --font-mono    JetBrains Mono      stat numbers, tech tags, periods

Animations defined here (used by any component via class):
  fadeUp         slide in from below on mount
  glow-pulse     rhythmic box-shadow breathe (used on stats row)
  float          gentle vertical bob
  shimmer        gradient sweep
  blink          cursor blink
```

---

## Component-by-Component Flow

### 1. Navbar (`"use client"`)

Marked `"use client"` because it uses React state and browser events.

```
Mount
  └─ useEffect registers window "scroll" listener
        └─ if scrollY > 40px → setScrolled(true)
              → adds .scrolled class
              → CSS applies backdrop-filter blur + border-bottom

Render
  ├─ Logo ("NE" monogram + full name) — links to #top
  ├─ Nav links array → maps to <a href="#section"> anchors
  │     clicking any link also calls setOpen(false) to close mobile menu
  ├─ "Download Resume" button → /Nitheesh_Edla_Resume.pdf (download attr)
  └─ Hamburger <button> → toggles open state → .open class shows mobile menu

Cleanup
  └─ useEffect return removes scroll listener on unmount
```

---

### 2. Hero (`"use client"`)

Marked `"use client"` because it runs a Canvas animation loop.

```
Mount
  └─ useEffect initialises HTML5 Canvas:
        1. Size canvas to its container dimensions
        2. Spawn 60 particles with random position, radius, velocity, opacity
        3. Start requestAnimationFrame draw loop:
              clear → draw each particle dot (cyan rgba) → move → bounce on edges
        4. Add window "resize" listener to resize canvas dimensions

Render
  ├─ <canvas>       floating particle dots (aria-hidden, purely decorative)
  ├─ .grid div      subtle CSS grid overlay (two linear-gradients, 50px × 50px)
  ├─ Badge row      certification/experience pills mapped from badges[]
  ├─ <h1>           main headline with gradient-clipped accent span
  ├─ <p>            sub-headline
  ├─ CTA row        primary (→ #projects anchor) + secondary (PDF download)
  └─ Stats row      4 metrics mapped from stats[] — each shows value + label
                    entire row has glow-pulse animation

Cleanup
  └─ useEffect return cancels animation frame + removes resize listener
```

---

### 3. Projects

Pure Server Component (no `"use client"`). All data is defined as a JS array
in the same file — no fetch, no database.

```
Data shape (defined inline in Projects.js):
  projects[]  →  array of 4 objects, each with:
    category  string   displayed as a pill badge
    title     string   card heading
    concept   string   one-line description
    outcomes  string[] each may contain <strong> HTML for bold highlights
    tech      string[] technology pill tags

Render flow:
  Projects
    └─ renders section#projects wrapper
          └─ maps projects[] → <ProjectCard project={p} index={i} />

ProjectCard receives { project, index }:
  ├─ animationDelay = index * 0.1s   (staggered fadeUp)
  ├─ Number badge  "01" / "02" / "03" / "04"
  ├─ Category pill
  ├─ Title + concept paragraph
  ├─ outcomes[]  → <ul> with SVG checkmark + dangerouslySetInnerHTML
  │     (dangerouslySetInnerHTML is safe here — data is hardcoded, not user input)
  └─ tech[]      → row of <span> pill tags
```

The 4 projects:
1. Multi-Cloud Automated Infrastructure Platform (Matilda Cloud)
2. Banregio Banking Infrastructure Migration (AWS → Azure)
3. Self-Service Infrastructure & Incident Remediation Tooling
4. AWS Serverless Application Platform

---

### 4. ExperienceTimeline

Pure Server Component. Data defined inline in two arrays.

```
experience[]  — 3 jobs, each with: role, company, period, location, highlights[], tags[]
certifications[] — 4 certs, each with: name, abbr, color (hex)

Layout: CSS Grid with two columns
  ┌─────────────────────────────┬──────────────┐
  │  Timeline (left, main)      │  Aside        │
  │                             │  (right, 320px│
  │  Vertical line drawn via    │   sticky)     │
  │  .timeline::before          │               │
  │                             │  ┌───────────┐│
  │  Each job entry:            │  │ Certs card││
  │  ┌──┬──────────────────┐    │  └───────────┘│
  │  │● │ period + location│    │  ┌───────────┐│
  │  │  │ role + company   │    │  │ Edu card  ││
  │  │  │ highlights list  │    │  └───────────┘│
  │  │  │ tech tag pills   │    │               │
  │  └──┴──────────────────┘    │               │
  └─────────────────────────────┴───────────────┘

The vertical timeline line is a pseudo-element on .timeline with a
linear-gradient from --accent (cyan) to --accent-2 (purple).

Each .dot is a 14px circle with --accent background + box-shadow ring.
On hover the ring expands with a glow.

Certifications render as colored badge squares using the cert's hex color
for background-color (at 20% opacity) and border-color (at 40% opacity).
```

---

### 5. SkillsGrid

Pure Server Component. Data defined inline as categories[].

```
categories[]  — 8 objects, each with: name, icon (emoji), skills[]

Renders a 4-column CSS Grid (responsive: 3 col → 2 col → 1 col).

Each card:
  ├─ animationDelay = index * 0.07s  (staggered fadeUp)
  ├─ emoji icon + category name header
  └─ skills[]  → row of <span> pill tags
        on card hover: pills transition from muted to cyan accent colour
```

The 8 categories: DevOps & Containers, Cloud Platforms, Infrastructure as Code,
CI/CD, Observability, Networking, Programming, Databases.

---

### 6. Contact

Pure Server Component. No form — contact is link-based only.

```
Renders 3 contact links (each is an <a> with an inline SVG icon):
  1. mailto:nitheeshreddye@gmail.com
  2. linkedin.com/in/nitheesh-edla-b01644118  (target="_blank")
  3. tel:9407582747

A radial-gradient pseudo-element behind the section creates a soft cyan
glow centred at the top — purely decorative.
```

---

### 7. Footer

Pure Server Component.

```
Two columns:
  Left:  "© 2025 Nitheesh Edla. Built with Next.js."
  Right: Email | LinkedIn | Resume (PDF download)
```

---

## Page Scroll Behaviour

All navigation is anchor-based (`#projects`, `#experience`, `#skills`, `#contact`).
`html { scroll-behavior: smooth }` in globals.css handles the animated scroll.
No JavaScript router navigation is used — it is a true single-page static site.

---

## Rendering Model

```
Build time (npm run build)
  Next.js pre-renders page.js → static HTML + CSS bundles
  Output: /.next/  (gitignored)

Runtime
  Browser downloads HTML (pre-rendered, instant first paint)
  React hydrates the two "use client" components:
    → Navbar   attaches scroll listener
    → Hero     starts canvas particle animation
  All other components are inert HTML — no JS needed after hydration
```

---

## Responsive Breakpoints

| Breakpoint  | Layout change                                          |
|-------------|--------------------------------------------------------|
| ≤ 1100px    | SkillsGrid drops from 4 → 3 columns                  |
| ≤ 900px     | Projects grid 2→1 col; Experience aside moves below   |
| ≤ 768px     | Navbar collapses to hamburger; SkillsGrid 3→2 col      |
| ≤ 640px     | Hero stats row 4→2 columns                            |
| ≤ 600px     | Experience aside stacks vertically                    |
| ≤ 480px     | SkillsGrid 2→1 col                                    |

---

## Adding or Changing Content

| What to change              | Where                                      |
|-----------------------------|--------------------------------------------|
| Hero headline / sub / stats | `components/Hero.js` — top-of-file consts  |
| Certification badges        | `components/Hero.js` — `badges[]`          |
| Projects list               | `components/Projects.js` — `projects[]`    |
| Work experience             | `components/ExperienceTimeline.js` — `experience[]` |
| Certifications sidebar      | `components/ExperienceTimeline.js` — `certifications[]` |
| Skills / tech stack         | `components/SkillsGrid.js` — `categories[]` |
| Contact info                | `components/Contact.js` — hardcoded links  |
| Colour palette / fonts      | `app/globals.css` — CSS custom properties  |
| Page title / SEO            | `app/layout.js` — `metadata` export        |
| Resume PDF                  | Drop file into `public/` as `Nitheesh_Edla_Resume.pdf` |
