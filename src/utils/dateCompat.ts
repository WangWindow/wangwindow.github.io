import type { CollectionEntry } from "astro:content";

type BlogData = CollectionEntry<"blog">["data"];

/**
 * Get the publication date from post data.
 * Supports both 'date' (new format from Blogs) and 'pubDatetime' (legacy).
 */
export function getPubDate(data: BlogData): Date {
  return data.pubDatetime ?? data.date ?? new Date();
}

/**
 * Get the modification date from post data.
 * Supports both 'updated' (new format) and 'modDatetime' (legacy).
 */
export function getModDate(data: BlogData): Date | undefined | null {
  return data.modDatetime ?? data.updated;
}

/**
 * Get the effective date (mod date if available, otherwise pub date).
 */
export function getEffectiveDate(data: BlogData): Date {
  return getModDate(data) ?? getPubDate(data);
}
