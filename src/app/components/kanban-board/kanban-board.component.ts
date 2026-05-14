import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { TaskPriority, TaskStatus } from '../../core/models/task.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TaskCardComponent } from '../task-card/task-card.component';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from '../../core/models/task.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-kanban-board',
  imports: [MatButtonToggleModule, TaskCardComponent, DragDropModule, MatDialogModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  private taskService = inject(TaskService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  activeFilter = this.taskService.filter;

  todoTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'todo'));
  inProgressTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'in-progress'));
  doneTasks = computed(() => this.taskService.tasks().filter(t => t.status === 'done'));

  setFilter(priority: TaskPriority | 'all') {
    this.taskService.setFilter(priority);
  }

  moveTask(id: string, status: TaskStatus) {
    this.taskService.moveTask(id, status);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
    this.snackBar.open('Tarea eliminada correctamente', 'Cerrar', { duration: 3000 });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
      const task = event.item.data as Task;
      const newStatus = event.container.id as TaskStatus;
      this.moveTask(task.id, newStatus);
    }
  }

  openTaskForm(task: Task | null = null) {
    this.dialog.open(TaskFormComponent, {
      width: '500px',
      disableClose: true,
      data: task
    });
  }

  editTask(task: Task) {
    this.openTaskForm(task);
  }
}
