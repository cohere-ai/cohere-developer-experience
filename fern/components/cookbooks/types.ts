export interface TagCategories {
  capabilities: { original: string; display: string }[];
  products: { original: string; display: string }[];
  thirdParty: { original: string; display: string }[];
}

export interface CookbooksTagCategories {
  capabilities: string[]; // Simplified version for Cookbook
  products: string[];
  thirdParty: string[];
}

export interface Cookbook {
  title: string;
  description: string;
  tags: CookbooksTagCategories; // Updated to use CookbooksTagCategories
  href: string;
  author?: {
    name: string;
    image: string;
  };
}
