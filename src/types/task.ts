
export interface CategoryInterface {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface TaskInterface {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: CategoryInterface | null;
  dueDate?: string;
  createdAt: string;
}
