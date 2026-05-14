import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { TaskPriority, TaskStatus } from '../../core/models/task.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-kanban-board',
  imports: [MatButtonToggleModule],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoard {
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
}
