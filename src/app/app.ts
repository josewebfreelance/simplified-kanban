import { Component, signal, inject } from '@angular/core';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { ThemeService } from './core/services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from "@angular/material/tooltip";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [KanbanBoardComponent, MatButtonModule, MatIconModule, MatTooltip],
})
export class App {
  readonly title = signal('Gestor de tareas');
  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.isDarkMode;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
