import React from 'react';
import { Cookbooks } from './Cookbooks';

export const CookbookPage: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 dark:dark-theme-text-color">
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Cookbooks</h1>
      <p className="text-gray-600 mb-8 dark:dark-theme-text-color">
        Explore what you can build on Cohere's generative AI platform with our new interface. 
        Search and filter cookbooks by title, description, or tags to find exactly what you need.
      </p>
    </div>
    <Cookbooks />
  </div>
);
