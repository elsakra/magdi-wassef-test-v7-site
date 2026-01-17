import { defineCollection, z } from 'astro:content';

const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string().optional(), // Made optional - some team members may not have a role listed
    image: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    order: z.number().default(0),
  }),
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortDescription: z.string().optional(),
    image: z.string().optional(),
    icon: z.string().optional(),
    price: z.string().optional(),
    duration: z.string().optional(),
    features: z.array(z.string()).optional(),
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    author: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    image: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    author: z.string().optional(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
  }),
});

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  team,
  services,
  testimonials,
  blog,
  faq,
};
