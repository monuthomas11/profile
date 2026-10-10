# Profile Website

A bold, fast, and accessible digital CV for a single owner. The project follows the plan in `PLAN.md` and is built with Next.js App Router, TypeScript, Tailwind CSS, and Motion.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Required environment variables

Copy `.env.example` to `.env.local` and fill in values when you are ready to enable contact email delivery:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SITE_URL`: public site URL used in metadata and canonical links
- `RESEND_API_KEY`: API key for sending contact messages via Resend
- `CONTACT_TO_EMAIL`: destination email for contact form submissions
- `CONTACT_FROM_EMAIL`: sender email used by Resend

The app builds and runs without these values present; the contact form falls back to a clear error message when email delivery is unavailable.

## Features

- Single-page CV homepage with anchored sections
- Dark and light theme support with persistent preference
- Downloadable placeholder CV PDF
- Print-friendly `/resume` page
- Contact form with validation, honeypot protection, and rate limiting
- Blog with MDX posts and RSS feed
- SEO metadata, sitemap, robots, and Open Graph image support

## Deployment

This project is designed for Vercel. Configure the same environment variables in your Vercel project settings before enabling the contact form in production.
