
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    indigo: 'bg-indigo/90 hover:bg-indigo',
    vermilion: 'bg-vermilion/90 hover:bg-vermilion',
    moss: 'bg-moss/90 hover:bg-moss',
    gray: 'bg-gray-400/90 hover:bg-gray-400',
    default: 'bg-muted/90 hover:bg-muted'
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
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "px-2 py-0.5 text-xs rounded-full flex items-center transition-colors duration-200", 
        bgColor, 
        className
      )}
    >
      <span className="text-foreground/90">{category.name}</span>
    </motion.div>
  );
}
