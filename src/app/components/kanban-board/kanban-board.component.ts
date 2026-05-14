import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { TaskPriority, TaskStatus } from '../../core/models/task.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TaskCardComponent } from '../task-card/task-card.component';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-kanban-board',
  imports: [MatButtonToggleModule, TaskCardComponent, DragDropModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  private taskService = inject(TaskService);

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
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
      const task = event.item.data as Task;
      const newStatus = event.container.id as TaskStatus;
      this.moveTask(task.id, newStatus);
    }
  }
}
