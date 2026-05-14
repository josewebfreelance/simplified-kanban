import { Component, signal } from '@angular/core';
import { KanbanBoard } from './components/kanban-board/kanban-board';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [KanbanBoard]
})
export class App {
  readonly title = signal('Gestor de tareas');
}
