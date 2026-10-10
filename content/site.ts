export const site = {
  name: "Monu Thomas",
  headline: "Software Engineer | ASP.NET Core | Angular | Playwright | Azure | SQL",
  field: "Software Engineering",
  email: "monuthomas11@yahoo.in",
  location: "Bengaluru, Karnataka, India",
  /*
   * The record's revision date — the only date on the page a human maintains.
   * Bump it when the record actually changes; a rev with no diff behind it is
   * the lie the changelog grammar exists to refuse.
   */
  rev: "2026-10-10",
  siteDomain: "",
  tagline:
    "Full stack developer working with .NET, Angular, TypeScript, Playwright test automation, and Azure. Microsoft Certified Azure Developer Associate, GitHub Copilot Certified.",
  socialLinks: [
    { label: "GitHub", url: "https://github.com/monuthomas11", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/monuthomas", icon: "linkedin" },
    { label: "Email", url: "mailto:monuthomas11@yahoo.in", icon: "mail" },
  ],
  initials: "MT",
  seo: {
    title: "Monu Thomas — software engineer, Bengaluru",
    description:
      "Monu Thomas is a software engineer in Bengaluru working with ASP.NET Core, Blazor, Angular, Azure, and SQL. Read the writing, or start a conversation.",
    image: "/images/photo.jpg",
  },
} as const;

/** Short city label for the status hairline, derived from `location`. */
export const siteCity = site.location.split(",")[0]?.trim() ?? site.location;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
