import React from 'react';

interface TagButtonProps {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
}

const tagButtonClass = "px-2 py-1 text-[12px] rounded-full transition-colors cursor-pointer font-normal";
const selectedTagClass = "bg-[#333293] text-white hover:bg-[#333293]/90";
const unselectedTagClass = "bg-white text-[#666666] shadow-[0_0_0_1px_#E5E5E5] outline outline-1 outline-[#E5E5E5] hover:bg-[#d4d4f0] hover:text-[#4d4d4d]";

export const TagButton: React.FC<TagButtonProps> = ({ tag, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`${tagButtonClass} ${isSelected ? selectedTagClass : unselectedTagClass}`}
  >
    {tag}
  </button>
);
