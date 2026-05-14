import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'kanban_theme';
  isDarkMode = signal<boolean>(this.loadTheme());

  constructor() {
    effect(() => {
      const dark = this.isDarkMode();
      localStorage.setItem(this.THEME_KEY, dark ? 'dark' : 'light');
      if (dark) {
        document.body.classList.add('dark-theme');
        document.body.style.colorScheme = 'dark';
      } else {
        document.body.classList.remove('dark-theme');
        document.body.style.colorScheme = 'light';
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
  }

  private loadTheme(): boolean {
    const saved = localStorage.getItem(this.THEME_KEY);
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
