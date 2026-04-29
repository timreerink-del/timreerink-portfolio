# timreerink.com

Personal portfolio for Tim Reerink, Product Design Lead. Built with Astro 6, MDX content collections, and vanilla CSS. Deployed to Vercel.

## Stack

- **Framework**: Astro (static output)
- **Content**: MDX in `src/content/cases/` with type-safe Zod schemas
- **Styling**: Vanilla CSS with custom properties — no Tailwind, no UI library
- **Fonts**: Self-hosted via `@fontsource-variable/fraunces` and `@fontsource/jetbrains-mono`
- **Hosting**: Vercel free tier
- **Analytics**: Vercel Web Analytics (no consent banner needed — no PII)

Zero client JS by default. Animations are CSS. Reduced-motion respected.

## Commands

```sh
npm install        # one-time
npm run dev        # http://localhost:4321
npm run build      # production build → ./dist
npm run preview    # serve the production build locally
```

## Project structure

```
src/
├── pages/
│   ├── index.astro              # homepage composition
│   ├── 404.astro
│   └── work/[slug].astro        # case page route
├── content/
│   └── cases/*.mdx              # six case studies
├── content.config.ts            # Zod schema for cases (Astro 6 location)
├── layouts/
│   ├── Base.astro               # html shell, fonts, meta, analytics
│   └── Case.astro                # case-page chrome (hero, meta, MDX prose, metrics, next case)
├── components/
│   ├── Nav.astro                # fixed blurred nav
│   ├── Hero.astro               # massive Fraunces headline
│   ├── Marquee.astro            # CSS-only infinite scroll
│   ├── CaseCard.astro           # accent-aware card
│   ├── Metrics.astro            # outcome numbers
│   ├── About.astro
│   ├── Skills.astro
│   ├── Contact.astro
│   └── Footer.astro
├── styles/
│   ├── tokens.css               # design tokens (colours, type, scale, space)
│   ├── global.css               # reset + primitives
│   └── animations.css           # marquee + reduced-motion
└── assets/cases/*.svg           # placeholder hero images (replace with real)
```

## Adding a new case

1. Drop a hero image (1600×1000 ideal) into `src/assets/cases/your-case-hero.{jpg,webp,svg}`.
2. Create `src/content/cases/your-slug.mdx`:
   ```mdx
   ---
   title: "Outcome-driven case title"
   company: "Company"
   year: 2026
   role: "Your role"
   order: 0                      # 1 = first card on the page
   featured: true                # full-width on the homepage grid
   accent: "orange"              # one of: orange | lime | blue | amber | pink | violet
   tags: ["Strategy", "Design Ops"]
   summary: "One-line homepage hook. Not descriptive — punchy."
   hero: "../../assets/cases/your-case-hero.svg"
   duration: "6 months"
   team: "5 designers + 2 PMs"
   metrics:                      # optional; rendered as the outcome block
     - label: "Critique cadence"
       value: "+400%"
   ---

   ## The challenge
   ...
   ## Approach
   ...
   ## What we built
   ...
   ## Reflection
   ...
   ```
3. `npm run dev` — the case appears in the work grid and at `/work/your-slug`.

Use `draft: true` in frontmatter to hide a case in progress.

## Swapping accent colours

The six per-case accents are defined as CSS custom properties in [src/styles/tokens.css](src/styles/tokens.css):

```css
--c-orange: #ff5b2e;
--c-lime:   #c4ff00;
--c-blue:   #5cb6ff;
--c-amber:  #ffb800;
--c-pink:   #ff3ea5;
--c-violet: #b18cff;
```

Change a hex value to retint every component using that accent. To add a new accent:

1. Add the token to `tokens.css` (e.g. `--c-coral: #ff8166`).
2. Add the name to the Zod enum in [src/content.config.ts](src/content.config.ts).
3. Use it in any case's frontmatter as `accent: "coral"`.

Per-case accent flows through the inline style `--case-color: var(--c-{accent})` set on each card and the case page body. Components read `--case-color` so nothing is hard-coded per case.

All accents pass WCAG AA contrast (4.5:1+) on the dark background; the lowest is pink at 6.0:1.

## Replacing placeholder content

Five case bodies currently contain `[Tim to provide]` markers. Grep for them:

```sh
grep -r "Tim to provide" src/content/
```

The hero SVGs in `src/assets/cases/` are also placeholders — solid colour gradients with the company name. Replace with real images at the same paths.

## Deploying

The Vercel adapter is configured in [astro.config.mjs](astro.config.mjs) with web analytics enabled and the static output mode.

1. Push this repo to GitHub.
2. Import the repo in Vercel: https://vercel.com/new
3. Vercel auto-detects Astro and uses the right build command. No env vars required.
4. The first deploy gets a `*.vercel.app` URL. Add the custom domain (`timreerink.com`) under **Project → Settings → Domains**.

To deploy a draft branch:

```sh
git push origin feature/new-case   # produces a Vercel preview URL automatically
```

## Performance notes

- Fraunces variable + JetBrains Mono are self-hosted via fontsource (no CDN round-trip).
- Hero images are eager-loaded with `loading="eager"`; below-fold cards are lazy.
- Astro's `<Image>` component generates AVIF/WebP and serves correct widths via `srcset`.
- The site ships zero JavaScript except the small Vercel Analytics beacon.

## Out of scope

- No light-mode toggle (the design is dark, period).
- No CMS — MDX in git is the source of truth.
- No contact form — `mailto:` only.
- No cookie banner — Vercel Analytics is GDPR-compliant without one.

## Status

| Case | State |
|---|---|
| `randstad-dmp` | Frontmatter + placeholder body — Tim to write |
| `iceo-design-dept` | Full content shipped |
| `iceo-neobank` | Frontmatter + placeholder body — Tim to write |
| `jet-north-star` | Frontmatter + placeholder body — Tim to write |
| `jet-groceries` | Frontmatter + placeholder body — Tim to write |
| `jet-support-costs` | Frontmatter + placeholder body — Tim to write |

Hero images and OG image (`public/og/default.svg`) are placeholder SVGs — swap before launch.
