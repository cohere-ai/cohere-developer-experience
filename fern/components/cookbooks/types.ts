export interface TagCategories {
    useCases: string[];
    endpoints: string[];
    techStack: string[];
  }
  
  export interface Cookbook {
    title: string;
    description: string;
    imageSrc: string;
    tags: TagCategories;
    href: string;
    author?: {
      name: string;
      image: string;
    };
  }
  