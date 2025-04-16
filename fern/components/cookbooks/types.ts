export interface TagCategories {
  capabilities: { original: string; display: string }[];
  products: { original: string; display: string }[];
  thirdParty: { original: string; display: string }[];
}

export interface CookbooksTagCategories {
  capabilities: string[]; 
  products: string[];
  thirdParty: string[];
}

export interface Cookbook {
  title: string;
  description: string;
  tags: CookbooksTagCategories;
  href: string;
  author?: {
    name: string;
    image: string;
  };
}
