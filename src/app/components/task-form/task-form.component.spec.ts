import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../core/services/task.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../core/models/task.model';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: TaskService;

  const mockDialogRef = {
    close: vi.fn()
  };

  const mockTask: Task = {
    id: '1',
    title: 'Existing Task',
    description: 'Desc',
    priority: 'medium',
    status: 'todo'
  };

  const setupTest = (data: Task | null = null) => {
    TestBed.configureTestingModule({
      imports: [TaskFormComponent, NoopAnimationsModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
        TaskService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    fixture.detectChanges();
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Create Mode', () => {
    beforeEach(() => {
      setupTest(null);
    });

    it('should initialize with empty form', () => {
      expect(component.taskForm.value).toEqual({
        title: '',
        description: '',
        priority: 'medium'
      });
    });

    it('should call addTask and close dialog on valid submit', () => {
      const spy = vi.spyOn(taskService, 'addTask');

      component.taskForm.patchValue({
        title: 'New Task',
        description: 'New Desc',
        priority: 'high'
      });

      component.onSubmit();

      expect(spy).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Task',
        description: 'New Desc',
        priority: 'high',
        status: 'todo'
      }));
      expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });
  });

  describe('Edit Mode', () => {
    beforeEach(() => {
      setupTest(mockTask);
    });

    it('should initialize with task data', () => {
      expect(component.taskForm.value).toEqual({
        title: mockTask.title,
        description: mockTask.description,
        priority: mockTask.priority
      });
    });

    it('should call updateTask and close dialog on valid submit', () => {
      const spy = vi.spyOn(taskService, 'updateTask');

      component.taskForm.patchValue({
        title: 'Updated Title'
      });

      component.onSubmit();

      expect(spy).toHaveBeenCalledWith(expect.objectContaining({
        id: mockTask.id,
        title: 'Updated Title'
      }));
      expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    });
  });

  it('should not submit if form is invalid', () => {
    setupTest(null);
    const spy = vi.spyOn(taskService, 'addTask');

    component.taskForm.patchValue({ title: 'ab' }); // Too short
    component.onSubmit();

    expect(spy).not.toHaveBeenCalled();
  });
});
