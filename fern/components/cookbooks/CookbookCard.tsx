import React from 'react';
import { Cookbook } from './types';

interface CookbookCardProps {
  cookbook: Cookbook;
  bgColor: string;
}

export const CookbookCard: React.FC<CookbookCardProps> = ({ cookbook, bgColor }) => (
  <a
    href={cookbook.href}
    className={`block border border-gray-200 rounded-lg hover:shadow-md transition-shadow ${bgColor}`}
  >
    <div className="p-6">
      <h3 className="text-base font-medium text-gray-800 mb-3">{cookbook.title}</h3>
      {cookbook.author && (
        <div className="flex items-center mb-4">
          <img
            src={cookbook.author.image}
            alt={cookbook.author.name}
            className="w-5 h-5 rounded-full mr-2"
          />
          <span className="text-xs text-gray-600">{cookbook.author.name}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {cookbook.tags.endpoints.map(tag => (
          <span
            key={tag}
            className="px-1.5 py-0.5 text-[10px] text-gray-600 bg-white/50 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </a>
);
