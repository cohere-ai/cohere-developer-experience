import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { SearchBar } from './SearchBar';
import { CookbookCard } from './CookbookCard';
import { TagCategories } from './types';
import { cookbooks } from './data/cookbooks';

const CARD_COLORS = ['bg-[#EEF0EF]', 'bg-[#FDF2F0]', 'bg-[#F8F1F9]', 'bg-[#F0F2FB]'];

export const Cookbooks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<TagCategories>({
    useCases: [],
    endpoints: [],
    techStack: []
  });

  const toggleTag = (category: keyof TagCategories, tag: string) => {
    setSelectedTags(prev => ({
      ...prev,
      [category]: prev[category].includes(tag)
        ? prev[category].filter(t => t !== tag)
        : [...prev[category], tag]
    }));
  };

  const filteredCookbooks = cookbooks.filter(cookbook => {
    const matchesQuery = searchQuery === '' || 
      cookbook.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUseCases = selectedTags.useCases.length === 0 || 
      selectedTags.useCases.every(tag => cookbook.tags.useCases.includes(tag));

    const matchesEndpoints = selectedTags.endpoints.length === 0 || 
      selectedTags.endpoints.every(tag => cookbook.tags.endpoints.includes(tag));

    const matchesTechStack = selectedTags.techStack.length === 0 || 
      selectedTags.techStack.every(tag => cookbook.tags.techStack.includes(tag));

    return matchesQuery && matchesUseCases && matchesEndpoints && matchesTechStack;
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar selectedTags={selectedTags} toggleTag={toggleTag} />

        <div className="flex-1">
          <div className="mb-6">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCookbooks.map((cookbook, index) => (
              <CookbookCard 
                key={cookbook.href} 
                cookbook={cookbook} 
                bgColor={CARD_COLORS[index % CARD_COLORS.length]} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
