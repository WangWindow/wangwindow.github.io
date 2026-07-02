import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

function removeDupsAndLowerCase(array: readonly string[]): string[] {
  return [...new Set(array.map((str) => str.toLowerCase()))];
}

const dateSchema = z
  .string()
  .or(z.date())
  .transform((value) => new Date(value));

const optionalDateSchema = dateSchema
  .optional()
  .nullable()
  .transform((value) => value ?? undefined);

const post = defineCollection({
  loader: glob({ base: "./content/posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        slug: z.string().optional(),
        description: z.string().default(""),
        cover: image().or(z.string()).optional(),
        coverImage: z
          .object({
            alt: z.string(),
            src: image(),
          })
          .optional(),
        draft: z.boolean().default(false),
        ogImage: z.string().optional(),
        tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
        categories: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
        date: dateSchema.optional(),
        pubDatetime: dateSchema.optional(),
        publishDate: dateSchema.optional(),
        modDatetime: optionalDateSchema,
        updated: optionalDateSchema,
        updatedDate: optionalDateSchema,
        featured: z.boolean().default(false),
        sticky: z.boolean().default(false),
        pinned: z.boolean().default(false),
        summary: z.string().optional(),
      })
      .transform((data, context) => {
        const publishDate = data.publishDate ?? data.date ?? data.pubDatetime;
        if (!publishDate) {
          context.addIssue({
            code: "custom",
            message: "Post frontmatter must include date, pubDatetime, or publishDate.",
            path: ["date"],
          });
          return z.NEVER;
        }

        return {
          ...data,
          coverImage:
            data.coverImage ??
            (data.cover && typeof data.cover !== "string"
              ? {
                alt: data.title,
                src: data.cover,
              }
              : undefined),
          pinned: data.pinned || data.sticky || data.featured,
          publishDate,
          updatedDate: data.updatedDate ?? data.updated ?? data.modDatetime,
        };
      }),
});

export const collections = { post };
