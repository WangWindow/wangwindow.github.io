import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";
import { getEffectiveDate } from "./dateCompat";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(getEffectiveDate(b.data).getTime() / 1000) -
        Math.floor(getEffectiveDate(a.data).getTime() / 1000)
    );
};

export default getSortedPosts;
