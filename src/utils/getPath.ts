import { BLOG_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";

/**
 * Get full path of a blog post
 * @param id - id of the blog post (aka slug)
 * @param filePath - the blog post full file location
 * @param includeBase - whether to include `/posts` in return value
 * @returns blog post path
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true
) {
  const basePath = includeBase ? "/posts" : "";

  const normalizedSegments = filePath
    ?.replace(BLOG_PATH, "")
    .replace(/\.md$/, "")
    .split("/")
    .filter(segment => segment !== "")
    .filter(segment => !segment.startsWith("_"));

  if (normalizedSegments && normalizedSegments.length > 0) {
    const pathSegments = normalizedSegments
      .map(segment => slugifyStr(segment))
      .filter(segment => segment !== "index");

    if (pathSegments.length < 1) {
      return basePath || "/";
    }

    return [basePath, ...pathSegments].join("/");
  }

  // Fallback for entries without filePath
  const blogId = id
    .split("/")
    .map(segment => slugifyStr(segment))
    .filter(segment => segment !== "index");

  if (blogId.length < 1) {
    return basePath || "/";
  }

  return [basePath, ...blogId].join("/");
}
