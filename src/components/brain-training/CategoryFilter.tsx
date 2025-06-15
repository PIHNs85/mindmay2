
import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => (
  <div>
    <h2 className="text-lg font-medium text-white mb-4 drop-shadow-lg">Game Categories</h2>
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className={selectedCategory === category 
            ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md" 
            : "bg-white/90 text-gray-900 border-white/50 hover:bg-white shadow-md"
          }
        >
          {category}
        </Button>
      ))}
    </div>
  </div>
);
