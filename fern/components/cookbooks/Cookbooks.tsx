import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { SearchBar } from './SearchBar';
import { CookbookCard } from './CookbookCard';
import { TagCategories } from './types';
import { cookbooks } from './data/cookbooks';

const CARD_COLORS = ['bg-[#EEF0EF] dark:bg-[#636363]', 'bg-[#FDF2F0] dark:bg-[#3b3b3b]', 'bg-[#F8F1F9] dark:bg-[#222222]', 'bg-[#F0F2FB] dark:bg-[#141414]'];

export const Cookbooks: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<TagCategories>({
    useCases: [],
    products: [],
    thirdParty: []
  });

  const toggleTag = (category: keyof TagCategories, tag: { original: string; display: string }) => {
    setSelectedTags(prev => ({
      ...prev,
      [category]: prev[category].some(t => t.original === tag.original)
        ? prev[category].filter(t => t.original !== tag.original)
        : [...prev[category], tag]
    }));
  };

  const filteredCookbooks = cookbooks.filter(cookbook => {
    const matchesQuery = searchQuery === '' || 
      cookbook.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUseCases = selectedTags.useCases.length === 0 || 
      selectedTags.useCases.every(tag => 
        cookbook.tags.useCases.some(c => c === tag.original)
      );

    const matchesEndpoints = selectedTags.products.length === 0 || 
      selectedTags.products.every(tag => 
        cookbook.tags.products.some(p => p === tag.original)
      );

    const matchesTechStack = selectedTags.thirdParty.length === 0 || 
      selectedTags.thirdParty.every(tag => 
        cookbook.tags.thirdParty.some(t => t === tag.original)
      );

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
