
import React, { useState } from 'react';
import { Check, Calendar, Trash2, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { CategoryBadge } from './CategoryBadge';
import { TaskInterface } from '@/types/task';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: TaskInterface;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
  dragHandleProps?: any;
}

export function TaskItem({ task, onComplete, onDelete, isDragging, dragHandleProps }: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleComplete = () => {
    onComplete(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "task-card relative flex items-start mb-3 cursor-default",
        task.completed && "opacity-60",
        isDragging && "shadow-md border-primary/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {task.category && (
        <span 
          className={cn("category-indicator", {
            "bg-indigo": task.category.color === "indigo",
            "bg-vermilion": task.category.color === "vermilion",
            "bg-moss": task.category.color === "moss",
            "bg-gray-400": task.category.color === "gray",
            "bg-muted": !task.category.color || task.category.color === "default"
          })}
        />
      )}
      
      <div className="pl-3 flex-1 flex items-start">
        <button 
          onClick={handleComplete}
          className={cn(
            "flex-shrink-0 w-5 h-5 border rounded-full mr-3 mt-1 flex items-center justify-center transition-all",
            task.completed ? "bg-indigo border-indigo" : "border-muted-foreground/30 hover:border-indigo/50"
          )}
        >
          {task.completed && <Check size={12} className="text-white" />}
        </button>

        <div className="flex-1">
          <p className={cn(
            "font-medium text-base mb-1 ink-transition",
            task.completed && "line-through text-muted-foreground/70"
          )}>
            {task.title}
          </p>
          
          {task.description && (
            <p className={cn(
              "text-sm text-muted-foreground ink-transition",
              task.completed && "line-through text-muted-foreground/50"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center mt-2 space-x-2">
            {task.category && (
              <CategoryBadge category={task.category} />
            )}
            
            {task.dueDate && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar size={12} className="mr-1" />
                <span>{format(new Date(task.dueDate), 'MMM d')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center ml-2">
        {isHovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleDelete}
            className="btn-task text-destructive hover:bg-destructive/10"
          >
            <Trash2 size={14} />
          </motion.button>
        )}
        
        <div {...dragHandleProps} className="cursor-grab ml-1 p-1 rounded-md hover:bg-secondary">
          <GripVertical size={16} className="text-muted-foreground/60" />
        </div>
      </div>
    </motion.div>
  );
}
