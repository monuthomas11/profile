# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: peers, community, and potential collaborators and clients — people forming a lasting impression of who Monu Thomas is and whether to reach out.

Secondary: recruiters and hiring managers, who still visit and read the work history, but are no longer the first audience the site is framed for.

## Product Purpose

A single-owner brand surface for Monu Thomas. It exists to make one engineer distinct and memorable, then open a conversation, then let the site's own execution stand as evidence of craft — in that order.

Success, weighted in order:
1. The visitor remembers Monu as a distinct person.
2. The right visitor starts a conversation (roles, collaborations, projects).
3. The site itself demonstrates craft through how it is made and feels.

## Positioning

A **brand surface, not a product site**: the person leads and the CV is evidence inside that, rather than a digital-CV form that a visitor scans and leaves. What a neighboring surface could not truthfully copy is that this is one real person's verifiable decade-plus engineering history (IBM, MariApps, SGE, Emirates Exchange, PIT) expressed as personal identity rather than as a resume document.

Binding owner directive: *"This site should be a Brand surface, not a usual product."*

## Operating Context

- Content lives as typed files in `/content` and MDX in `/content/blog`; there is no CMS, database, or admin UI. The owner edits the repo.
- Static-first Next.js App Router site, deployed on Vercel (per README); contact email delivery via Resend when configured, with a graceful fallback when not.
- Source material for content: LinkedIn PDF import recorded in `DECISIONS.md`, `Profile.pdf` and `image.png` at the repo root.

## Capabilities and Constraints

- Existing routes: `/` (identity-first home), `/blog` + `/blog/[slug]` + RSS, `/resume` (print-friendly, no PDF download), `/api/contact`, sitemap, robots, OG image.
- No cookies, no analytics requiring a consent banner; privacy-friendly stance is non-negotiable.
- Only real, verifiable content — roles, dates, certifications, copy. Nothing invented: no fabricated testimonials, customers, metrics, press, or pricing.
- Open decision (owner did not confirm as non-negotiable): whether the blog, contact form, and `/resume` page remain first-class capabilities in the brand-surface reframing. They exist today; do not remove without asking, do not treat as confirmed forever.
- Open decision: final domain (`siteDomain` is empty; `NEXT_PUBLIC_SITE_URL` drives canonical URLs).

## Brand Commitments

- Binding: the site is a **Brand surface, not a usual product** (owner, explicit).
- Identity facts fixed as confirmed: name **Monu Thomas**, email **monuthomas11@yahoo.in**, socials **GitHub + LinkedIn + mailto** only (no X).
- No availability badge or availability claim anywhere (owner removed it deliberately).
- No PDF download entry points; `/resume` print route stays.
- Visual world (palette, type, motion) is deliberately not defined here — it is owned by the redesign work that follows.

## Evidence on Hand

- Real content: `content/site.ts`, `content/about.ts`, `content/experience.ts` (5 roles), `content/education.ts`, `content/skills.ts`. No `content/highlights.ts` — it was removed; any future work must not reintroduce its old contents (IBM award, delivery highlights) without the owner re-supplying them.
- Portrait: `public/images/photo.jpg` (5:7 subject-forward crop derived from the owner's original; a 2× master sits at `public/images/photo@2x.jpg`). The uncropped original is not in the repo — the owner holds it; replacing the crop with a new source needs no code change.
- One sample post: `content/blog/first-post.mdx`.
- Project history and constraints: `PLAN.md`, `DECISIONS.md`, `README.md`.
- Absences future work must not fabricate: no testimonials, no press, no client logos, no case studies, no published metrics, no domain decided.

## Product Principles

1. **Identity before inventory.** The person and their point of view lead; the work history is evidence, not the frame.
2. **Truth is the brand.** Every claim traces to a real fact on hand; absence is shown as absence, never filled with invention.
3. **The surface proves the craft.** How the site is built and feels is part of what it says about Monu (third priority, never at the cost of the first two).
4. **Invite, don't funnel.** The site opens a conversation; it does not push a transaction or a signup.
5. **Lightweight and private by default.** No cookie banners, no tracking bloat — fast, accessible, and respectful of visitors.

## Accessibility & Inclusion

WCAG 2.2 AA target (per PLAN.md §11): full keyboard navigation, visible focus, AA contrast in both themes, `prefers-reduced-motion` respected, semantic landmarks, 44×44 px touch targets.
