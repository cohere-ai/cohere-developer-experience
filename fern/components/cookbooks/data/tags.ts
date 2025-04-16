import { TagCategories } from "../types";
import { cookbooks } from "./cookbooks";

export function generateDisplayTag(tag: string): string {
  return tag
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function transformTags(tags: string[]): { original: string; display: string }[] {
  return Array.from(new Set(tags)).map((tag) => ({
    original: tag,
    display: generateDisplayTag(tag), // Use the reusable function
  }));
}

export const ALL_TAGS: TagCategories = {
  capabilities: transformTags(
    cookbooks.flatMap((cookbook) => cookbook.tags.capabilities)
  ),
  products: transformTags(
    cookbooks.flatMap((cookbook) => cookbook.tags.products)
  ),
  thirdParty: transformTags(
    cookbooks.flatMap((cookbook) => cookbook.tags.thirdParty)
  ),
};
