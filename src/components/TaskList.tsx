
import React from 'react';
import { TaskItem } from './TaskItem';
import { AnimatePresence, Reorder } from 'framer-motion';
import { TaskInterface } from '@/types/task';

interface TaskListProps {
  tasks: TaskInterface[];
  setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
  filter: 'all' | 'active' | 'completed';
}

export function TaskList({ tasks, setTasks, filter }: TaskListProps) {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleComplete = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <Reorder.Group 
      axis="y" 
      values={filteredTasks} 
      onReorder={setTasks}
      className="mt-6"
    >
      <AnimatePresence initial={false}>
        {filteredTasks.map(task => (
          <Reorder.Item 
            key={task.id} 
            value={task}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            whileDrag={{ 
              scale: 1.02, 
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)" 
            }}
          >
            {(provided) => (
              <TaskItem 
                task={task} 
                onComplete={handleComplete} 
                onDelete={handleDelete}
                isDragging={false}
                dragHandleProps={provided.dragControls}
              />
            )}
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}
