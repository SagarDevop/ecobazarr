import React from "react";

const FilterBar = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-1 rounded-full text-sm border ${
            selected === cat ? "bg-brand-500 text-white shadow-warm" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
