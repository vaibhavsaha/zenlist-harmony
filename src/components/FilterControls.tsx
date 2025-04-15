
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterControlsProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  taskCount: {
    all: number;
    active: number;
    completed: number;
  };
}

export function FilterControls({ filter, setFilter, taskCount }: FilterControlsProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex">
        <Button
          variant="ghost"
          onClick={() => setFilter('all')}
          className={cn("text-sm font-normal", 
            filter === 'all' 
              ? "text-foreground font-medium underline decoration-indigo decoration-2 underline-offset-4" 
              : "text-muted-foreground"
          )}
        >
          All <span className="ml-1 opacity-60">({taskCount.all})</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => setFilter('active')}
          className={cn("text-sm font-normal", 
            filter === 'active' 
              ? "text-foreground font-medium underline decoration-indigo decoration-2 underline-offset-4" 
              : "text-muted-foreground"
          )}
        >
          Active <span className="ml-1 opacity-60">({taskCount.active})</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => setFilter('completed')}
          className={cn("text-sm font-normal", 
            filter === 'completed' 
              ? "text-foreground font-medium underline decoration-indigo decoration-2 underline-offset-4" 
              : "text-muted-foreground"
          )}
        >
          Completed <span className="ml-1 opacity-60">({taskCount.completed})</span>
        </Button>
      </div>
    </div>
  );
}
