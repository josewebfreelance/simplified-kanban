import { Component, signal } from '@angular/core';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [KanbanBoardComponent]
})
export class App {
  readonly title = signal('Gestor de tareas');
}
