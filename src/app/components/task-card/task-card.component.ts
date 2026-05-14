import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../core/models/task.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent {
  task = input.required<Task>();

  delete = output<void>();
  edit = output<Task>();

  onDelete() {
    this.delete.emit();
  }

  onEdit(task: Task) {
    this.edit.emit(task);
  }
}
