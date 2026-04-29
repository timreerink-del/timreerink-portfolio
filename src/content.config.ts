import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cases' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    company: z.string(),
    year: z.number(),
    role: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    accent: z.enum(['orange', 'lime', 'blue', 'amber', 'pink', 'violet']),
    tags: z.array(z.string()),
    summary: z.string(),
    hero: image(),
    metrics: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    duration: z.string(),
    team: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { cases };
