
import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: {
    id: string;
    name: string;
    color: string;
  };
  minimal?: boolean;
  className?: string;
}

export function CategoryBadge({ category, minimal = false, className }: CategoryBadgeProps) {
  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo',
    vermilion: 'bg-vermilion',
    moss: 'bg-moss',
    gray: 'bg-gray-400',
    default: 'bg-muted',
  };

  const bgColor = colorMap[category.color] || colorMap.default;

  if (minimal) {
    return (
      <div 
        className={cn("w-2 h-2 rounded-full mr-2", bgColor, className)}
        title={category.name}
      />
    );
  }

  return (
    <div 
      className={cn(
        "px-2 py-0.5 text-xs rounded-full flex items-center animate-brush-stroke", 
        bgColor, 
        className
      )}
    >
      <span className="text-white">{category.name}</span>
    </div>
  );
}
