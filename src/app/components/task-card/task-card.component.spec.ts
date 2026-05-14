import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';
import { Task } from '../../core/models/task.model';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    priority: 'high',
    status: 'todo'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('task', mockTask);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render task details correctly', () => {
    const titleElement = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
    const descriptionElement = fixture.debugElement.query(By.css('mat-card-content p')).nativeElement;

    expect(titleElement.textContent).toContain(mockTask.title);
    expect(descriptionElement.textContent).toContain(mockTask.description);
  });

  it('should emit edit event when edit button is clicked', () => {
    const spy = vi.spyOn(component.edit, 'emit');
    const editButton = fixture.debugElement.query(By.css('.edit')).nativeElement;

    editButton.click();

    expect(spy).toHaveBeenCalledWith(mockTask);
  });

  it('should emit delete event when delete button is clicked', () => {
    const spy = vi.spyOn(component.delete, 'emit');
    const deleteButton = fixture.debugElement.query(By.css('.delete')).nativeElement;

    deleteButton.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should apply correct priority class', () => {
    const cardElement = fixture.debugElement.query(By.css('.task-card')).nativeElement;
    expect(cardElement.classList).toContain('priority-high');
  });
});
