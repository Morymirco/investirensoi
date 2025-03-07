import React from 'react';

interface Category {
  id: number;
  name: string;
}

interface CategoryListProps {
  categories: Category[];
}


const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <div key={category.id} className="bg-gray-200 text-gray-800 rounded-full px-4 py-2">
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryList; 