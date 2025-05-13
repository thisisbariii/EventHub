import React from 'react';

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  // Define color mapping for different categories
  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'conference':
        return 'bg-blue-500 dark:bg-blue-600';
      case 'workshop':
        return 'bg-green-500 dark:bg-green-600';
      case 'concert':
        return 'bg-purple-500 dark:bg-purple-600';
      case 'festival':
        return 'bg-yellow-500 dark:bg-yellow-600';
      case 'networking':
        return 'bg-indigo-500 dark:bg-indigo-600';
      case 'sports':
        return 'bg-red-500 dark:bg-red-600';
      default:
        return 'bg-gray-500 dark:bg-gray-600';
    }
  };

  return (
    <span 
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(category)}`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;