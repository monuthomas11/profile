---
name: "The Changelog — Monu Thomas"
description: "A personal homepage written in release-notes grammar: an actively maintained record, not a static CV."
colors:
  paper-stock: "#f4f4f1"
  paper-ink: "#1a1c20"
  paper-muted: "#e9e9e4"
  paper-muted-ink: "#565b63"
  paper-border: "rgba(26, 28, 32, 0.16)"
  paper-surface: "#ffffff"
  paper-mark: "rgba(26, 28, 32, 0.42)"
  link-blue: "#2b5fd9"
  link-blue-on: "#ffffff"
  added-green: "#1b6e36"
  changed-amber: "#7d5a0e"
  removed-red: "#b3352b"
  form-danger: "#b3352b"
  form-success: "#1b6e36"
  editor-stock: "#15171b"
  editor-ink: "#e8e9e5"
  editor-muted: "#1d2026"
  editor-muted-ink: "#a6abb4"
  editor-border: "rgba(232, 233, 229, 0.18)"
  editor-surface: "#1b1e24"
  editor-mark: "rgba(232, 233, 229, 0.45)"
  link-blue-dark: "#7fa9ff"
  link-blue-dark-on: "#10121a"
  added-green-dark: "#4fc46b"
  changed-amber-dark: "#e3b23c"
  removed-red-dark: "#ff7a6e"
  form-danger-dark: "#ff7a6e"
  form-success-dark: "#4fc46b"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 8.5vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline-sm:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
  caption:
    fontFamily: "Geist Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.16em"
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  mark: "2px"
spacing:
  hairline: "1px"
  gutter: "16px"
  section-gap: "48px"
components:
  button-ink:
    backgroundColor: "{colors.paper-ink}"
    textColor: "{colors.paper-stock}"
    rounded: "{rounded.none}"
    typography: "{typography.label}"
    padding: "12px 20px"
  button-ink-hover:
    backgroundColor: "{colors.link-blue}"
    textColor: "{colors.link-blue-on}"
    rounded: "{rounded.none}"
    typography: "{typography.label}"
    padding: "12px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.none}"
    typography: "{typography.label}"
    padding: "0"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.none}"
    typography: "{typography.body}"
    padding: "8px 0"
---

# Design System: The Changelog

## Overview

**Creative North Star: "The Living Changelog"**

A person's homepage written in the grammar of a `CHANGELOG.md`. Where a CV is a frozen snapshot that
ages the moment it is written, a changelog is the format we reserve for things that are *maintained* —
so the format itself asserts "this record is still being updated," which is the first impression the
owner wants. Section headers become entries (`## About`, `## Writing`, `## [Unreleased]`), dates become
`rev` and `since`, the headline becomes the first `+` addition, and the contact block becomes the open
`[Unreleased]` entry — the conversation as the unwritten next line.

The world refuses three defaults: the CV-spine portfolio (a scannable resume the visitor leaves), the
SaaS hero (feature-benefit headline + gradient + CTA stack), and the neon dev-portfolio (dark glow,
terminal kitsch, synth color). Its material is **flat print + notation** — hairlines, square corners,
and a mono gutter of diff marks — so it reads like a document, not an app. The only chromatic surface
on the page is the owner's real photograph; every other color is semantic ink that means something.

**Key Characteristics:**
- Changelog / release-notes grammar rendered as a document, not an interface.
- Semantic ink only: green = added, amber = changed, blue = link, red reserved (no removed line in a person's record).
- Flat print material: 1px hairlines, square corners, zero shadow/gradient/blur.
- Three self-hosted families: Archivo (display), Geist (body), Geist Mono (notation only).
- One authored motion gesture — a diff mark's tint flash, "a patch landing."

## Colors

The palette is semantic ink on stock: nothing is colored for decoration, and light/dark are two stocks
of the same document (paper stock / editor stock). Values below are light (paper stock); each has a
dark (editor stock) twin declared in the frontmatter and in `app/globals.css`.

### Primary
- **Added Green** (`#1b6e36`, dark `#4fc46b`): the `+` added-line mark, the email underline, `::selection`
  tint, and the `mark-apply` flash. The world's affirmative ink.
- **Link Blue** (`#2b5fd9`, dark `#7fa9ff`): links, the focus ring, hover states, and the ink-block
  button's hover fill. The "conversation" color — it fires where the visitor can act.

### Secondary
- **Changed Amber** (`#7d5a0e`, dark `#e3b23c`): applied in exactly one place — the `## [Unreleased]`
  title via `EntryHeader tone="changed"`. Contrast 5.7:1 light / 9.0:1 dark.

### Tertiary
- **Removed Red** (`#b3352b`, dark `#ff7a6e`): defined but **unused** — no removed line exists in a
  person's record. Its twin `form-danger` is reserved for form errors only.

### Neutral
- **Paper Stock** (`#f4f4f1`, dark editor `#15171b`): the page background.
- **Paper Ink** (`#1a1c20`, dark `#e8e9e5`): primary text and the ink-block button fill.
- **Paper Muted** (`#e9e9e4`, dark `#1d2026`): hover wash on list rows.
- **Paper Muted Ink** (`#565b63`, dark `#a6abb4`): metadata, labels, captions.
- **Paper Border** (`rgba(26,28,32,0.16)`, dark `rgba(232,233,229,0.18)`): every hairline.
- **Paper Surface** (`#ffffff`, dark `#1b1e24`): flat inset panel (portrait frame, theme toggle) — never a floating card.
- **Paper Mark** (`rgba(26,28,32,0.42)`, dark `rgba(232,233,229,0.45)`): neutral `##` notation glyph.

### Named Rules
**The Semantic Ink Rule.** Color only ever means something: green = added, amber = changed, blue =
link/conversation. Nothing is colored for decoration. The contract constrains *where* color may
appear; it does not require all four inks to fire, so `--removed` legitimately stays unused.

## Typography

**Display Font:** Archivo (self-hosted via `next/font`, `display: swap`, latin subset)
**Body Font:** Geist (self-hosted)
**Label/Mono Font:** Geist Mono (self-hosted) — notation only

**Character:** An engineering-print grotesque over a neutral UI sans over a mono notation face. The
pairing reads like a printed document with a machine gutter: Archivo carries the human voice, Geist
carries the prose, and Geist Mono is confined to the machinery (status, nav, labels, dates, tags).

### Hierarchy
- **Display** (Archivo 700, `clamp(2.75rem, 8.5vw, 6rem)`, line-height 0.95, tracking `-0.03em`): the name; capped at 6rem.
- **Headline** (Archivo 600, `1.75rem` → `2.25rem` at `sm`, line-height 1, tracking `-0.02em`): `EntryHeader` section titles.
- **Title** (Archivo, `text-lg`): Writing post titles; the `[Unreleased]` email set `text-2xl` → `text-3xl`, tracking `-0.01em`.
- **Body** (Geist 400, `1rem`/`text-lg leading-8` for About, line-height 1.6): prose at `max-w-[68ch]` (About), `46ch` (headline), `60ch` (contact intro).
- **Label** (Geist Mono 400, `text-xs`/`text-[11px]`, tracking `0.10–0.16em`, uppercase): status line, nav, labels, dates, tags, metadata, footer.

### Named Rules
**The Notation Rule.** Geist Mono appears only as notation — status, nav, labels, dates, tags,
metadata, and the `.diff-mark` glyphs. It never sets prose. Display tracking never goes past the
`-0.04em` floor (reserved for heavy `font-black` page titles on `/blog` and `/resume`).

## Layout

A single centered document column (`max-w-5xl`) inside `px-4 sm:px-6 lg:px-8` gutters, opened by a
`sticky` header (`top-0 z-50`, `border-b`, opaque stock — no blur) and closed by a `border-t` footer.
Every section is a changelog entry introduced by `EntryHeader` (`border-t pt-5`), giving a consistent
rhythm: a hairline, a mono `##` mark, an Archivo title, and right-aligned tabular metadata on the
same baseline. Vertical rhythm is generous between entries (`section-gap` ~48px) and tight within them.

The masthead is a two-column split at `sm+` (name/headline/actions/facts on the left, portrait stamp
on the right) that stacks on mobile with the portrait last. Below `sm` the header nav collapses to a
square menu button opening a bordered list. The page is horizontally clean from 320px to 1280px with
no overflow; the document's `scroll-padding-top` (4.5rem) keeps anchor targets clear of the sticky
header.

## Elevation & Depth

This system is **flat**. There are no shadows, no gradients, and no `backdrop-filter`/blur anywhere.
Depth is conveyed entirely by **hairlines and flat tonal panels**: a 1px `--border` rule divides
regions, and a flat `--surface` fill marks an inset panel (the portrait frame, the theme toggle) —
never a floating, elevated card. Dark theme is not a "raised" mode; it is the same document printed on
editor stock. The one focus affordance is a 2px `--accent` outline with 2px offset, which is a state
indicator, not decoration.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest and never lift. If a new element seems to
need a shadow to separate, give it a hairline or a flat tonal panel instead.

## Shapes

Square corners throughout: buttons, marks, the portrait frame, and the theme toggle are all
`border-radius: 0`. The single micro-exception is `.diff-mark`, which carries a `2px` radius so it
reads as a highlighter pen over notation rather than a card. Borders are always 1px hairlines;
inputs are underline-only (`border-b`), and the portrait is a bordered `p-1.5` inset frame at
`aspect-[10/13]`. The skip link's `focus:rounded-full` pill is an accessibility affordance, not part
of the form language.

## Components

### Buttons
- **Shape:** square (`radius: 0`).
- **Ink-block (Primary):** `bg-foreground text-background`, mono uppercase label, `padding: 12px 20px`
  (`px-5 py-3`), trailing `ArrowRight` (14px). Used for "START A CONVERSATION" (mailto) and "SEND MESSAGE".
- **Hover / Focus:** fills to `bg-accent text-accent-foreground` (link blue); focus shows the global ring.
- **Ghost (Secondary):** underlined mono uppercase link with no fill ("READ THE WRITING", "FULL CV",
  "ALL WRITING →"). Uses `{colors.link-blue}` on the writing link.

### Inputs / Fields
- **Style:** underline-only (`border-b`), transparent background, square, body type, `padding: 8px 0`.
- **Focus:** the border transitions to `--foreground`.
- **Error / Disabled:** `aria-invalid` drives `border-danger`; a named error id is wired via
  `aria-describedby` with specific copy. Labels are always visible (never placeholders).

### Navigation
- **Style:** mono uppercase (`text-xs tracking-[0.14em]`), evenly spaced, `--muted-ink` at rest,
  `--foreground` on hover/active. Desktop shows it inline; mobile hides it behind a square `h-11 w-11`
  menu button (`aria-expanded`/`aria-controls`).

- **Share Card / OG Image** (`app/opengraph-image.tsx`): the off-site brand surface, printed on the
  same paper stock — `#f4f4f1` fill, the `CHANGELOG.md · rev · location` status hairline, the name in
  Archivo 104px, a green `+` before the headline, and a square hairline `--surface` initials tile in
  the footer. No gradient, no rounded icon, no "Profile" label.

### Signature: Diff Mark (`##` / `+` / `~`)
- **The recurring custom pattern that defines the system.** A mono glyph in a left gutter
  (`.diff-mark`, `2px` radius, `--mark` neutral or `--added` green) that sits inline inside headings
  and lines. Every entry's marks run one green tint-flash (`color-mix(--added 32%)` → transparent,
  900ms ease-out) when the section enters view — the page's single authored motion moment. Glyphs are
  `aria-hidden` so notation stays decorative to assistive tech.

## Do's and Don'ts

### Do:
- **Do** use hairlines (`1px --border`) to divide regions and flat `--surface` panels to inset them.
- **Do** keep every corner square (`radius: 0`) except the `.diff-mark` (`2px`) and the skip-link pill.
- **Do** confine Geist Mono to notation — status, nav, labels, dates, tags, metadata, diff marks.
- **Do** use color only semantically: green = added, amber = changed (the one `[Unreleased]` title), blue = link/conversation.
- **Do** set display type in Archivo within the `-0.03em` to `-0.04em` tracking range.
- **Do** render reduced-motion and no-JS states fully visible (motion may only hide content JS can restore).

### Don't:
- **Don't** add shadows, gradients, or `backdrop-filter`/blur — the material is flat print.
- **Don't** use color decoratively, and don't invent a use for `--removed` red (no removed line exists).
- **Don't** set prose in Geist Mono or let display tracking pass the `-0.04em` floor.
- **Don't** render a floating/elevated card; an inset panel is flat or it's a hairline.
- **Don't** put the CV spine (work history, roles) on the homepage — it lives only behind `/resume`.
- **Don't** fabricate testimonials, metrics, awards, or availability claims; absences are shown as absence.
