
import React, { useState } from 'react';
import { CalendarIcon, PlusCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CategorySelector } from './CategorySelector';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TaskInterface, CategoryInterface } from '@/types/task';

interface AddTaskFormProps {
  onAddTask: (task: Omit<TaskInterface, 'id'>) => void;
  categories: CategoryInterface[];
}

export function AddTaskForm({ onAddTask, categories }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryInterface | null>(null);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onAddTask({
      title,
      description,
      completed: false,
      category: category,
      dueDate: dueDate?.toISOString(),
      createdAt: new Date().toISOString(),
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory(null);
    setDueDate(undefined);
    setExpanded(false);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 animate-ink-spread">
      <div className="task-card">
        <div className="flex items-center">
          <div className="w-5 h-5 border border-muted-foreground/30 rounded-full mr-3 flex-shrink-0" />
          <Input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-0 shadow-none h-auto p-0 text-base focus-visible:ring-0 placeholder:text-muted-foreground/50"
            onFocus={() => setExpanded(true)}
          />
          {title && (
            <Button type="submit" size="sm" variant="ghost" className="p-1 ml-1">
              <PlusCircle size={18} className="text-indigo" />
            </Button>
          )}
        </div>

        {expanded && (
          <div className="pl-8 mt-3 space-y-3 animate-fade-in">
            <Textarea
              placeholder="Add description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none min-h-[60px] border border-border/30 focus-visible:ring-1 focus-visible:ring-indigo"
            />
            
            <div className="flex items-center gap-2 flex-wrap">
              <CategorySelector
                categories={categories}
                selectedCategory={category}
                onSelect={setCategory}
              />
              
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border border-border/60 hover:border-border",
                      dueDate && "text-foreground",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon size={16} />
                    {dueDate ? format(dueDate, 'PPP') : "Due date"}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date);
                      setCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              {dueDate && (
                <button
                  type="button"
                  onClick={() => setDueDate(undefined)}
                  className="text-muted-foreground rounded-full p-1 hover:bg-secondary"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            
            <div className="flex justify-between pt-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setExpanded(false);
                  setTitle('');
                  setDescription('');
                  setCategory(null);
                  setDueDate(undefined);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!title.trim()} className="bg-indigo hover:bg-indigo/90">
                Add Task
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
