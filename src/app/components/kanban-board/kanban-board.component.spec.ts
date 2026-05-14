import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KanbanBoardComponent } from './kanban-board.component';
import { TaskService } from '../../core/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { By } from '@angular/platform-browser';

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;
  let taskService: TaskService;
  let dialog: MatDialog;

  const mockTasks: Task[] = [
    { id: '1', title: 'Task 1', description: '', priority: 'high', status: 'todo' },
    { id: '2', title: 'Task 2', description: '', priority: 'medium', status: 'in-progress' },
    { id: '3', title: 'Task 3', description: '', priority: 'low', status: 'done' }
  ];

  beforeEach(async () => {
    const mockDialog = {
      open: vi.fn()
    };

    const mockSnackBar = {
      open: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [KanbanBoardComponent, NoopAnimationsModule],
    })
      .overrideComponent(KanbanBoardComponent, {
        set: {
          providers: [
            { provide: MatDialog, useValue: mockDialog },
            { provide: MatSnackBar, useValue: mockSnackBar },
            TaskService
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    taskService = fixture.debugElement.injector.get(TaskService);
    dialog = fixture.debugElement.injector.get(MatDialog);
    const snackBar = fixture.debugElement.injector.get(MatSnackBar);
    (component as any).snackBar = snackBar; // Ensure mock is used

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render three columns', () => {
    const columns = fixture.debugElement.queryAll(By.css('.column'));
    expect(columns.length).toBe(3);
  });

  it('should separate tasks by status correctly', () => {
    expect(Array.isArray(component.todoTasks())).toBe(true);
    expect(Array.isArray(component.inProgressTasks())).toBe(true);
    expect(Array.isArray(component.doneTasks())).toBe(true);
  });

  it('should call setFilter when priority toggle changes', () => {
    const spy = vi.spyOn(taskService, 'setFilter');
    component.setFilter('high');
    expect(spy).toHaveBeenCalledWith('high');
  });

  it('should open TaskForm dialog when openTaskForm is called', () => {
    const spy = vi.spyOn(dialog, 'open');
    component.openTaskForm();
    expect(spy).toHaveBeenCalled();
  });

  it('should call deleteTask when card emits delete', () => {
    const spy = vi.spyOn(taskService, 'deleteTask');
    const snackBar = fixture.debugElement.injector.get(MatSnackBar);
    const snackBarSpy = vi.spyOn(snackBar, 'open');
    
    component.deleteTask('some-id');
    
    expect(spy).toHaveBeenCalledWith('some-id');
    expect(snackBarSpy).toHaveBeenCalledWith('Tarea eliminada correctamente', 'Cerrar', { duration: 3000 });
  });
});
