import { about } from "@/content/about";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { skills } from "@/content/skills";
import { aboutSchema, educationSchema, experienceSchema, siteSchema, skillGroupSchema } from "@/types/content";

export const validatedSite = siteSchema.parse(site);
export const validatedAbout = aboutSchema.parse(about);
export const validatedExperience = experience.map((item) => experienceSchema.parse(item));
export const validatedEducation = {
  degrees: education.degrees.map((item) => educationSchema.parse(item)),
  certifications: education.certifications.map((item) => educationSchema.parse(item)),
};
export const validatedSkills = skills.map((group) => skillGroupSchema.parse(group));

export const content = {
  site: validatedSite,
  about: validatedAbout,
  experience: validatedExperience,
  education: validatedEducation,
  skills: validatedSkills,
};
