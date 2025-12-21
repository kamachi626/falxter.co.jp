import { defineCollection, z } from 'astro:content';

const works = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    industry: z.string(),
    role: z.string(),
    tech: z.string(),
    impact: z.string(),
    note: z.string().optional()
  })
});

export const collections = { works };
