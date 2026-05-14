import { Injectable, signal, computed, effect } from '@angular/core';
import { Task, TaskPriority, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly STORAGE_KEY = 'kanban_tasks';

  private tasksSignal = signal<Task[]>(this.loadFromStorage());
  private filterSignal = signal<TaskPriority | 'all'>('all');

  tasks = computed(() => {
    const allTasks = this.tasksSignal();
    const filter = this.filterSignal();

    if (filter === 'all') {
      return allTasks;
    }
    return allTasks.filter(task => task.priority === filter);
  });

  filter = computed(() => this.filterSignal());

  constructor() {
    effect(() => {
      const currentTasks = this.tasksSignal();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(currentTasks));
    });
  }

  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID()
    };
    this.tasksSignal.update(tasks => [...tasks, newTask]);
  }

  updateTask(updatedTask: Task): void {
    this.tasksSignal.update(tasks =>
      tasks.map(t => (t.id === updatedTask.id ? updatedTask : t))
    );
  }

  deleteTask(id: string): void {
    this.tasksSignal.update(tasks => tasks.filter(t => t.id !== id));
  }

  moveTask(id: string, newStatus: TaskStatus): void {
    this.tasksSignal.update(tasks =>
      tasks.map(t => (t.id === id ? { ...t, status: newStatus } : t))
    );
  }

  setFilter(priority: TaskPriority | 'all'): void {
    this.filterSignal.set(priority);
  }

  private loadFromStorage(): Task[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}
