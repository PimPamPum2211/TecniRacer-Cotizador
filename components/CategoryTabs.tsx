import React from 'react';

interface Props {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
}

export const CategoryTabs: React.FC<Props> = ({ categories, active, onChange }) => (
  <div className="flex gap-2 overflow-x-auto mb-4">
    {categories.map((c) => (
      <button
        key={c}
        onClick={() => onChange(c)}
        className={`px-4 py-2 rounded-full whitespace-nowrap ${
          c === active
            ? 'bg-brand-blue text-white'
            : 'bg-gray-200 text-brand-blue'
        }`}
      >
        {c}
      </button>
    ))}
  </div>
);
