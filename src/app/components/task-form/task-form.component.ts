import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../../core/services/task.service';
import { Task, TaskPriority } from '../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  private fb = inject(NonNullableFormBuilder);
  private taskService = inject(TaskService);
  private dialogRef = inject(MatDialogRef<TaskFormComponent>);
  private snackBar = inject(MatSnackBar);
  public data = inject<Task | null>(MAT_DIALOG_DATA);

  taskForm = this.fb.group({
    title: [this.data?.title ?? '', [Validators.required, Validators.minLength(3)]],
    description: [this.data?.description ?? '', [Validators.required]],
    priority: [this.data?.priority ?? 'medium' as TaskPriority, [Validators.required]],
  });

  onSubmit() {
    if (this.taskForm.valid) {
      const { title, description, priority } = this.taskForm.getRawValue();

      if (this.data) {
        this.taskService.updateTask({
          ...this.data,
          title,
          description,
          priority
        });
      } else {
        this.taskService.addTask({
          title,
          description,
          priority,
          status: 'todo',
        });
      }

      this.snackBar.open(
        this.data ? 'Tarea actualizada correctamente' : 'Tarea creada correctamente',
        'Cerrar',
        { duration: 3000 }
      );

      this.dialogRef.close(true);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
