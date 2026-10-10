# PLAN.md — Personal Profile / Digital CV Website

> **Audience:** an autonomous developer agent. Read this whole file before writing code.
> Follow the phases in order. Do not add features that are not listed here. When something is ambiguous, pick the simplest option that satisfies the acceptance criteria and record the decision in `DECISIONS.md`.

---

## 1. Project Summary

Build a **single-owner profile website that works as a digital CV**. It is *not* a general project-showcase portfolio. A visitor (recruiter, hiring manager, collaborator) should understand **who the owner is, what they have done, and how to contact them within 30 seconds**, then be able to dig deeper.

**Tone / feel:** bold, creative, confident, memorable. Large expressive typography, strong colour, purposeful motion. It must still be fast, accessible and easy to read like a CV.

**Domain / site name:** `{{SITE_DOMAIN}}` — the owner's own name (pattern like `firstnamelastname.com`). Domain selection is handled by the owner; the code must not hard-code it (use `NEXT_PUBLIC_SITE_URL`).

### Placeholders the owner will fill in
Everything personal lives in content files (Section 6), never inside components. Use obvious placeholder text until real content is supplied.

| Placeholder | Meaning |
|---|---|
| `{{FULL_NAME}}` | Owner's full name |
| `{{HEADLINE}}` | One-line professional headline (e.g. "Backend engineer who ships reliable systems") |
| `{{FIELD}}` | Profession / domain |
| `{{EMAIL}}` | Public contact email |
| `{{SITE_DOMAIN}}` | Final domain |
| `{{LOCATION}}` | City / country (optional) |

---

## 2. Goals and Non-Goals

### Goals
1. Present a clear, scannable digital CV: intro, experience, skills, education, selected highlights, contact.
2. Look bold and creative with polished animation, without hurting performance or accessibility.
3. Offer a downloadable PDF resume.
4. Provide a working contact form.
5. Include a lightweight blog / writing section.
6. Support dark and light themes.
7. Deploy cleanly on Vercel with good SEO and share previews.

### Non-Goals
- No CMS, database, user accounts or admin UI. Content is files in the repo.
- No analytics requiring cookie consent banners (privacy-friendly analytics optional, see Section 12).
- No e-commerce, comments, newsletters or search (v1).
- No multi-language support (v1), but keep copy in content files so it could be added later.

---

## 3. Tech Stack (fixed)

| Concern | Choice |
|---|---|
| Framework | **Next.js (latest stable), App Router, TypeScript (strict)** |
| Styling | **Tailwind CSS (latest stable)**, design tokens via CSS variables |
| Animation | **Motion** (`motion` package, formerly Framer Motion). Use CSS for simple effects |
| Theming | `next-themes` (class strategy, system default, no flash on load) |
| Blog | MDX files in repo, parsed with `gray-matter` + `next-mdx-remote` (RSC) or equivalent, syntax highlighting via `rehype-pretty-code` or `shiki` |
| Forms | Next.js Route Handler + `zod` validation |
| Email delivery | **Resend** (API key via env var). Fallback if not configured: log server-side and return a clear error |
| Icons | `lucide-react` |
| Fonts | `next/font` (self-hosted, no layout shift). Choose 1 display font + 1 text font + optional mono |
| Linting / format | ESLint (Next config), Prettier, `prettier-plugin-tailwindcss` |
| Package manager | `pnpm` |
| Hosting | **Vercel** |

---

## 4. Design Direction

### 4.1 Principles
- **Typography-led.** Oversized hero text, tight tracking on headings, generous whitespace.
- **One strong accent colour** (pick a vivid one; e.g. electric lime, hot coral or violet) plus neutral base. Define as tokens so the owner can change it in one place.
- **Purposeful motion.** Motion reveals structure and hierarchy; never decorative noise.
- **CV legibility first.** Creative flourishes must not reduce readability of experience, dates and skills.

### 4.2 Tokens (define in `globals.css`)
- Colours: `--bg`, `--fg`, `--muted`, `--border`, `--accent`, `--accent-fg`, with light and dark values. Meet WCAG AA contrast in both themes.
- Type scale: fluid sizes using `clamp()`; hero heading can reach roughly `clamp(3rem, 12vw, 10rem)`.
- Spacing and radius scale; one consistent container width (`max-w-6xl` or similar).

### 4.3 Motion spec
- **Hero:** staggered text reveal (per word or line), subtle accent element animation (e.g. marquee, blob, or underline sweep).
- **Sections:** fade/slide-up on scroll into view (once, not repeated).
- **Experience timeline:** progress line that fills as the user scrolls.
- **Hover/focus:** magnetic or underline effects on links and buttons.
- **Page transitions:** simple, fast fade (optional, drop if it causes issues).
- **Rules (mandatory):**
  - Respect `prefers-reduced-motion`: disable or drastically reduce all non-essential motion.
  - Only animate `transform` and `opacity` where possible.
  - No scroll-jacking. Native scrolling must remain intact.
  - No animation may delay content from being readable by more than ~600 ms.

### 4.4 Theme toggle
- Sun/moon button in the header, keyboard accessible, with an accessible name ("Toggle theme").
- Defaults to system preference; persists choice; no flash of wrong theme on first paint.

---

## 5. Information Architecture

### 5.1 Routes
| Route | Purpose |
|---|---|
| `/` | Single-page CV: all main sections below |
| `/blog` | Blog index (list of posts, newest first) |
| `/blog/[slug]` | Individual post |
| `/resume` | Print-friendly CV page **and** link to download PDF |
| `/not-found` | Custom 404 matching the design |
| `/sitemap.xml`, `/robots.txt` | Generated via Next.js metadata routes |
| `/api/contact` | POST endpoint for the contact form |

### 5.2 Home page sections (in order)
1. **Header / Nav** — sticky, minimal: name/monogram, anchor links (About, Experience, Skills, Writing, Contact), theme toggle, "Download CV" button. Collapses to an accessible mobile menu.
2. **Hero** — `{{FULL_NAME}}`, `{{HEADLINE}}`, short one-sentence intro, primary CTAs: "Download CV" and "Get in touch". Social links.
3. **About** — 1–2 short paragraphs, optional photo, quick facts (location, availability status, languages).
4. **Experience** — reverse-chronological timeline. Each entry: role, company, dates, location, 2–5 achievement bullets, tech/tags.
5. **Skills** — grouped (e.g. Languages, Frameworks, Tools, Soft skills). Visual tags or compact grid. **No percentage bars** (they are meaningless on a CV).
6. **Education & Certifications** — degree, institution, dates; certifications with issuer and year.
7. **Highlights** *(optional, owner may leave empty)* — 3–6 notable achievements, projects, awards or publications as short cards with optional links. This is a CV highlights strip, not a full portfolio.
8. **Writing** — latest 3 blog posts with "View all" link.
9. **Contact** — contact form, email link, socials, availability note.
10. **Footer** — copyright, small links, "Back to top".

If a content file for an optional section is empty, **that section must not render** (and its nav link must disappear).

---

## 6. Content Model (data-driven)

All personal content lives in `/content`. Components receive typed data; nothing personal is hard-coded in JSX.

```
/content
  site.ts            # name, headline, tagline, email, location, socials, SEO defaults, availability
  about.ts           # paragraphs, quick facts, photo path
  experience.ts      # array of Experience
  education.ts       # array of Education + certifications
  skills.ts          # grouped skills
  highlights.ts      # optional highlight cards
  /blog
    first-post.mdx   # frontmatter + MDX body
```

### Types (put in `/types/content.ts`, validate with zod at build time)

```ts
type Experience = {
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  start: string;          // "2022-03"
  end?: string;           // omit = "Present"
  summary?: string;
  bullets: string[];      // 2–5 achievement statements
  tags?: string[];
};

type Education = {
  degree: string;
  institution: string;
  start: string;
  end?: string;
  notes?: string;
};

type SkillGroup = { title: string; items: string[] };

type Social = { label: string; url: string; icon: "github" | "linkedin" | "x" | "mail" | "link" };

type PostFrontmatter = {
  title: string;
  description: string;
  date: string;           // ISO
  tags?: string[];
  draft?: boolean;        // draft posts are excluded from production
  cover?: string;
};
```

**Seed all files with realistic placeholder content** so the site looks complete on first run. Mark placeholders clearly (e.g. `"{{FULL_NAME}}"` or `"Lorem…"`), so nothing fake is accidentally published.

---

## 7. Feature Specifications

### 7.1 PDF resume
- Source of truth: a static file at `/public/resume/{{FULL_NAME_SLUG}}-resume.pdf` supplied by the owner. Ship a placeholder PDF so the button works.
- "Download CV" buttons use a plain `<a href download>` link; set a sensible download filename.
- The `/resume` route renders the same CV data in a clean, single-column, **print-optimised** layout (`@media print` styles: no nav, no animation, black on white, page-break control) so the owner can also "Print → Save as PDF" from the site.
- Do **not** generate PDFs server-side in v1.

### 7.2 Contact form
- Fields: **name** (required), **email** (required, validated), **message** (required, 10–2000 chars). Hidden **honeypot** field.
- Client: controlled form with inline validation messages, loading state, success and error states, announced to screen readers (`aria-live`). Disable the button while submitting. Preserve input on error.
- Server (`/api/contact`, POST only):
  - Validate with the same zod schema; reject on honeypot fill (return success-looking response, send nothing).
  - Basic **rate limiting** (per IP; in-memory or Vercel-compatible approach; keep it simple and document the limitation).
  - Send via Resend to `CONTACT_TO_EMAIL` from `CONTACT_FROM_EMAIL`, setting `reply-to` to the visitor's email.
  - Never expose secrets to the client. Return generic error messages; log details server-side only.
  - Sanitise/escape all user content in the email body.
- Always show the plain email link as an alternative path.

### 7.3 Blog / writing
- MDX posts in `/content/blog`, one file per post, slug = filename.
- Index page: title, date, description, tags, estimated reading time. Newest first. Exclude `draft: true` in production.
- Post page: title, date, reading time, tags, content, previous/next links, "Back to writing" link.
- MDX styling via a typography setup (Tailwind Typography plugin or custom components): headings with anchor links, code blocks with highlighting, blockquotes, images (`next/image`), tables.
- Generate `generateStaticParams` so all posts are statically built.
- RSS feed at `/blog/rss.xml` (route handler).
- Ship **one** sample post explaining that the blog is live.

### 7.4 Dark / light mode
See Section 4.4. Verify both themes for every component, including the PDF/print route (always light).

### 7.5 Animations and scroll effects
See Section 4.3. Build small reusable primitives (`<Reveal>`, `<StaggerText>`, `<Marquee>`, `<ScrollProgress>`) in `/components/motion`, so sections stay clean.

---

## 8. Project Structure

```
/app
  layout.tsx            # fonts, theme provider, metadata, header/footer
  page.tsx              # home sections
  globals.css           # tokens + Tailwind layers
  /blog
    page.tsx
    /[slug]/page.tsx
    /rss.xml/route.ts
  /resume/page.tsx
  /api/contact/route.ts
  not-found.tsx
  sitemap.ts
  robots.ts
  opengraph-image.tsx   # dynamic OG image using site name + headline
/components
  /layout               # Header, Footer, MobileMenu, ThemeToggle
  /sections             # Hero, About, Experience, Skills, Education, Highlights, Writing, Contact
  /ui                   # Button, Tag, Card, Container, SectionHeading
  /motion               # Reveal, StaggerText, Marquee, ScrollProgress
  /blog                 # MDX components, PostCard
/content                # see Section 6
/lib
  content.ts            # loaders + zod validation
  blog.ts               # post loading, reading time, sorting
  email.ts              # Resend wrapper
  rate-limit.ts
  utils.ts
/public
  /resume               # placeholder PDF
  /images
/types
README.md
DECISIONS.md
.env.example
```

Keep components small, typed and single-purpose. Prefer **Server Components**; use `"use client"` only where interactivity or animation requires it.

---

## 9. Environment Variables (`.env.example`)

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
```

Document in the README how to obtain and set these locally and on Vercel. The site must **build and run without them**, and the contact form should degrade gracefully with a clear message.

---

## 10. SEO, Sharing and Metadata

- Per-page `metadata` (title template, description, canonical URL, `openGraph`, `twitter`).
- Dynamic Open Graph image via `next/og`.
- JSON-LD `Person` structured data on the home page (name, jobTitle, url, sameAs socials).
- `sitemap.ts` including home, blog index and all posts. `robots.ts` allowing all and pointing to the sitemap.
- Favicon and app icons (simple monogram placeholder using the owner's initials and accent colour).
- Semantic HTML throughout: one `<h1>` per page, ordered headings, landmarks (`header`, `nav`, `main`, `footer`).

---

## 11. Accessibility and Performance Requirements

### Accessibility (WCAG 2.2 AA target)
- Full keyboard navigation; visible focus styles; "Skip to content" link.
- Colour contrast AA in both themes.
- All images have meaningful `alt` (or empty alt if decorative).
- Mobile menu and form follow ARIA best practices; form errors are programmatically associated with inputs.
- `prefers-reduced-motion` respected everywhere.
- Touch targets at least 44×44 px.

### Performance budgets (Lighthouse, mobile, production build)
- Performance **≥ 95**, Accessibility **≥ 95**, Best Practices **≥ 95**, SEO **100**.
- LCP < 2.0 s, CLS < 0.05, INP < 200 ms.
- Use `next/image` and `next/font`; no layout shift from fonts or images.
- Keep client JS small: lazy-load heavy animation code that is below the fold; avoid large dependencies.

---

## 12. Optional (only if time permits, after all acceptance criteria pass)
- Privacy-friendly analytics (Vercel Analytics or Plausible), no cookies.
- Subtle custom cursor on desktop only (must not break accessibility).
- `/uses` or `/now` page.

---

## 13. Implementation Phases

Complete each phase fully, run lint + type check + build, and commit before moving on.

**Phase 0 — Setup**
- Scaffold Next.js (App Router, TS, Tailwind, ESLint) with pnpm. Configure Prettier, path aliases, `.env.example`, `.gitignore`.
- Add fonts, theme provider, tokens, base layout, container, `README.md` and `DECISIONS.md`.

**Phase 1 — Content layer**
- Create types, zod schemas, seeded content files and loaders. Add build-time validation that fails with a readable error.

**Phase 2 — Static sections (no animation yet)**
- Build Header, Footer, Hero, About, Experience, Skills, Education, Highlights, Contact (UI only). Fully responsive, both themes. Theme toggle working.

**Phase 3 — Blog**
- MDX pipeline, index, post page, reading time, tags, RSS, sample post, Writing section on home.

**Phase 4 — Contact backend**
- `/api/contact`, validation, honeypot, rate limit, Resend integration, client states and a11y announcements.

**Phase 5 — Resume**
- `/resume` print layout, placeholder PDF, "Download CV" wiring.

**Phase 6 — Motion and polish**
- Add motion primitives and apply them per Section 4.3, with reduced-motion fallbacks. Tune the bold visual identity (accent, hero treatment, hover effects).

**Phase 7 — SEO and hardening**
- Metadata, OG image, JSON-LD, sitemap, robots, icons, 404 page. Audit accessibility and Lighthouse; fix regressions.

**Phase 8 — Deploy**
- Verify `pnpm build` passes cleanly. Write deployment steps in the README for Vercel (import repo, env vars, domain). Do a final checklist run.

---

## 14. Acceptance Criteria (definition of done)

- [ ] `pnpm install && pnpm dev` works from a fresh clone with no env vars.
- [ ] `pnpm lint`, `pnpm typecheck` (`tsc --noEmit`) and `pnpm build` all pass with zero errors.
- [ ] All Home sections render from `/content` data; empty optional sections are hidden.
- [ ] Theme toggle works, persists, follows system by default, no flash on load.
- [ ] Scroll/entrance animations present, and **disabled** under `prefers-reduced-motion`.
- [ ] "Download CV" downloads the PDF; `/resume` prints cleanly on one or two A4 pages.
- [ ] Contact form validates, shows loading/success/error states, honeypot and rate limit work; with env vars set, a real email is delivered with correct reply-to.
- [ ] Blog index, post pages and RSS work; drafts excluded in production.
- [ ] Fully usable by keyboard only; passes an automated axe check with no critical issues.
- [ ] Lighthouse targets in Section 11 are met on the production build.
- [ ] Looks correct at 360 px, 768 px, 1280 px and 1920 px widths.
- [ ] README explains: running locally, editing content, adding a blog post, replacing the PDF, setting env vars, deploying to Vercel.

---

## 15. Rules for the Agent

1. **Stay in scope.** Implement only what is described here.
2. **Content out of code.** No personal data hard-coded in components.
3. **Server Components by default;** client components only when needed.
4. **No unnecessary dependencies.** Justify each new package in `DECISIONS.md`.
5. **Never commit secrets.** Use env vars only.
6. **Verify as you go.** After each phase run lint, type check and build; fix before continuing.
7. **Accessibility and reduced motion are requirements,** not polish.
8. **Report at the end:** summarise what was built, list any deviations from this plan, and list the placeholders the owner must replace (name, headline, email, PDF, photo, copy, social links, accent colour, domain, env vars).

---

## 16. Open Items for the Owner (not blocking the agent)

- Final **name/domain** choice (`{{SITE_DOMAIN}}`).
- Real content: headline, about text, experience, skills, education, highlights.
- Photo (optional) and final PDF resume.
- Preferred accent colour and display font (agent should propose a default if not provided).
- Resend account, verified sender domain and contact email address.
