import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should add a task and update the tasks signal', () => {
    const initialTasksCount = service.tasks().length;

    service.addTask({
      title: 'Test Task',
      description: 'Test Description',
      priority: 'high',
      status: 'todo'
    });

    const tasks = service.tasks();
    expect(tasks.length).toBe(initialTasksCount + 1);
    expect(tasks[0].title).toBe('Test Task');
    expect(tasks[0].id).toBeDefined();
  });

  it('should update an existing task correctly', () => {
    service.addTask({
      title: 'Task to update',
      description: 'Desc',
      priority: 'low',
      status: 'todo'
    });

    const task = service.tasks()[0];
    const updatedTask: Task = { ...task, title: 'Updated Task', status: 'in-progress' };

    service.updateTask(updatedTask);

    const tasks = service.tasks();
    expect(tasks[0].title).toBe('Updated Task');
    expect(tasks[0].status).toBe('in-progress');
  });

  it('should correctly filter tasks based on priority', () => {
    service.addTask({ title: 'Task 1', description: '', priority: 'high', status: 'todo' });
    service.addTask({ title: 'Task 2', description: '', priority: 'low', status: 'todo' });
    service.addTask({ title: 'Task 3', description: '', priority: 'high', status: 'todo' });

    expect(service.tasks().length).toBe(3);
    service.setFilter('high');

    const filteredTasks = service.tasks();

    expect(filteredTasks.length).toBe(2);
    expect(filteredTasks.every(t => t.priority === 'high')).toBe(true);
  });
});
