import React, { useState, useEffect } from 'react';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskList } from '@/components/TaskList';
import { FilterControls } from '@/components/FilterControls';
import { AppHeader } from '@/components/AppHeader';
import { TaskInterface, CategoryInterface } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';  // This import will now work
import { toast } from '@/components/ui/use-toast';

// Initial categories data
const initialCategories: CategoryInterface[] = [
  { id: 'cat1', name: 'Personal', color: 'indigo' },
  { id: 'cat2', name: 'Work', color: 'vermilion' },
  { id: 'cat3', name: 'Health', color: 'moss' },
];

// Initial tasks data
const initialTasks: TaskInterface[] = [
  {
    id: 'task1',
    title: 'Meditate for 10 minutes',
    description: 'Focus on breathing and clear the mind',
    completed: false,
    category: initialCategories[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task2',
    title: 'Finish project proposal',
    description: 'Complete the draft and send to the team for review',
    completed: false,
    category: initialCategories[1],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task3',
    title: 'Go for a 30-minute walk',
    completed: false,
    category: initialCategories[2],
    createdAt: new Date().toISOString(),
  },
];

const Index = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>(() => {
    // Load tasks from localStorage or use initial data
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  const [categories] = useState<CategoryInterface[]>(initialCategories);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (taskData: Omit<TaskInterface, 'id'>) => {
    const newTask: TaskInterface = {
      ...taskData,
      id: uuidv4(),
    };
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
    
    toast({
      title: "Task added",
      description: `"${newTask.title}" has been added to your list`,
    });
  };

  const taskCount = {
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  };

  return (
    <div className="min-h-screen flex flex-col japanese-paper">
      <AppHeader />
      
      <main className="flex-1 container max-w-2xl py-8 px-4 sm:px-6">
        <h1 className="text-2xl font-medium mb-6">Today's Tasks</h1>
        
        <AddTaskForm onAddTask={handleAddTask} categories={categories} />
        
        <FilterControls 
          filter={filter} 
          setFilter={setFilter} 
          taskCount={taskCount} 
        />
        
        <TaskList 
          tasks={tasks} 
          setTasks={setTasks} 
          filter={filter} 
        />
        
        {tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your task list is empty. Add a new task to get started.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
