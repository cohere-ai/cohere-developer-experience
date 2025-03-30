import React from 'react';

interface TagButtonProps {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
}

const tagButtonClass = "px-2 py-1 text-[12px] rounded-full transition-colors cursor-pointer font-normal";
const selectedTagClass = "bg-[#333293] text-white hover:bg-[#333293]/90";
const unselectedTagClass = "bg-white text-[#666666] border border-[#E5E5E5] hover:bg-gray-50";

export const TagButton: React.FC<TagButtonProps> = ({ tag, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`${tagButtonClass} ${isSelected ? selectedTagClass : unselectedTagClass}`}
  >
    {tag}
  </button>
);
