import type { CollectionEntry } from "astro:content";
import { SITE } from "@config";
import { getPubDate } from "./dateCompat";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() > getPubDate(data).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
