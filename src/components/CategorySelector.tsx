
import React, { useState } from 'react';
import { Check, ChevronDown, Circle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { CategoryInterface } from '@/types/task';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  categories: CategoryInterface[];
  selectedCategory: CategoryInterface | null;
  onSelect: (category: CategoryInterface | null) => void;
}

export function CategorySelector({ categories, selectedCategory, onSelect }: CategorySelectorProps) {
  const [open, setOpen] = useState(false);

  const getCategoryColor = (color: string) => {
    const colorMap: Record<string, string> = {
      indigo: 'bg-indigo',
      vermilion: 'bg-vermilion',
      moss: 'bg-moss',
      gray: 'bg-gray-400',
      default: 'bg-muted',
    };
    
    return colorMap[color] || colorMap.default;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border/60 hover:border-border focus:outline-none"
          aria-expanded={open}
        >
          {selectedCategory ? (
            <>
              <span className={cn("w-2 h-2 rounded-full", getCategoryColor(selectedCategory.color))} />
              <span>{selectedCategory.name}</span>
            </>
          ) : (
            <span className="text-muted-foreground">Select category</span>
          )}
          <ChevronDown size={16} className="text-muted-foreground ml-auto" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-48" align="start">
        <Command className="rounded-lg border border-border">
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onSelect(null);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-2 py-1.5 aria-selected:bg-accent"
              >
                <Circle size={14} className="text-muted-foreground/70" />
                <span>None</span>
                {!selectedCategory && <Check size={16} className="ml-auto text-indigo" />}
              </CommandItem>
              
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  onSelect={() => {
                    onSelect(category);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-2 py-1.5 aria-selected:bg-accent"
                >
                  <span className={cn("w-3 h-3 rounded-full", getCategoryColor(category.color))} />
                  <span>{category.name}</span>
                  {selectedCategory?.id === category.id && <Check size={16} className="ml-auto text-indigo" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
