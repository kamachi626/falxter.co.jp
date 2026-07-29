import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const cases = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/cases" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(["コーポレートサイト制作", "システム診断・引き継ぎ", "システム保守・改修"]),
    industry: z.string(),
    systemType: z.string(),
    challenge: z.string(),
    scope: z.array(z.string()),
    approach: z.string(),
    result: z.string(),
    technologies: z.array(z.string()),
    duration: z.string(),
    team: z.string(),
    contractType: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
  }),
});
export const collections = { cases };
