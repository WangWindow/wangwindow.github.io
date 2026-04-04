import type { CollectionEntry } from "astro:content";
import { getPath } from "@utils/getPath";

const MARKDOWN_IMAGE_REGEX =
    /!\[[^\]]*\]\((<[^>]+>|[^)\s]+)(?:\s+["'][^"']*["'])?\)/;

function normalizeMarkdownImageSrc(rawSrc: string): string {
    const trimmed = rawSrc.trim();
    if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
        return trimmed.slice(1, -1).trim();
    }
    return trimmed;
}

function isAbsoluteUrl(src: string): boolean {
    return /^(https?:)?\/\//.test(src);
}

export function extractFirstMarkdownImage(markdown: string): string | undefined {
    const match = markdown.match(MARKDOWN_IMAGE_REGEX);
    if (!match?.[1]) {
        return undefined;
    }

    return normalizeMarkdownImageSrc(match[1]);
}

function imageValueToString(
    imageValue: CollectionEntry<"blog">["data"]["cover"]
): string | undefined {
    if (!imageValue) {
        return undefined;
    }

    return typeof imageValue === "string" ? imageValue : imageValue.src;
}

export function resolvePostCoverSource(post: CollectionEntry<"blog">) {
    const frontmatterCover = imageValueToString(post.data.cover);
    if (frontmatterCover) {
        return frontmatterCover;
    }

    return extractFirstMarkdownImage(post.body ?? "");
}

export function resolvePostImageUrl(post: CollectionEntry<"blog">, src: string): string {
    if (isAbsoluteUrl(src) || src.startsWith("/")) {
        return src;
    }

    const basePath = `${getPath(post.id, post.filePath)}/`;
    return new URL(src, `https://example.com${basePath}`).pathname;
}
