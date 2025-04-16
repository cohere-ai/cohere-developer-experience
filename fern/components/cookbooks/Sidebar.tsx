import React from 'react';
import { ALL_TAGS } from './data/tags';
import { TagCategories } from './types';
import { TagButton } from './TagButton';

interface SidebarProps {
  selectedTags: TagCategories;
  toggleTag: (category: keyof TagCategories, tag: { original: string; display: string }) => void;
}

function formatCategoryLabel(key: string): string {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2') 
      .replace(/^./, str => str.toUpperCase());
  }
  

export const Sidebar: React.FC<SidebarProps> = ({ selectedTags, toggleTag }) => (
  <div className="w-full md:w-64 flex-shrink-0">
    <div className="sticky top-4">
      {(Object.keys(ALL_TAGS) as (keyof TagCategories)[]).map(category => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-medium mb-4">
            {formatCategoryLabel(category)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS[category].map(tag => (
              <TagButton
                key={tag.original}
                tag={tag.display}
                isSelected={selectedTags[category].some(t => t.original === tag.original)}
                onClick={() => toggleTag(category, tag)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
