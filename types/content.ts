import { z } from "zod";

export const socialSchema = z.object({
  label: z.string(),
  url: z.string().url(),
  icon: z.enum(["github", "linkedin", "x", "mail", "link"]),
});

export const siteSchema = z.object({
  name: z.string(),
  headline: z.string(),
  field: z.string(),
  email: z.string().email(),
  location: z.string().optional(),
  siteDomain: z.string(),
  tagline: z.string(),
  availability: z.string().optional(),
  socialLinks: z.array(socialSchema),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
  }),
});

export const aboutSchema = z.object({
  paragraphs: z.array(z.string()),
  quickFacts: z.array(z.object({ label: z.string(), value: z.string() })),
  photoPath: z.string(),
});

export const experienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  companyUrl: z.string().url().optional(),
  location: z.string().optional(),
  start: z.string(),
  end: z.string().optional(),
  bullets: z.array(z.string()).min(1),
});

export const educationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  start: z.string(),
  end: z.string().optional(),
  notes: z.string().optional(),
});

export const skillGroupSchema = z.object({
  title: z.string(),
  items: z.array(z.string()),
});

export const postFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  cover: z.string().optional(),
});

export type Social = z.infer<typeof socialSchema>;
export type Site = z.infer<typeof siteSchema>;
export type About = z.infer<typeof aboutSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
