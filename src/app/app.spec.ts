import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ThemeService } from './core/services/theme.service';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('App', () => {
  let themeServiceMock: any;

  beforeEach(async () => {
    themeServiceMock = {
      isDarkMode: signal(false),
      toggleTheme: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [App, NoopAnimationsModule],
      providers: [
        { provide: ThemeService, useValue: themeServiceMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title()).toBe('Gestor de tareas');
  });

  it('should call toggleTheme on service when toggleTheme is called', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.toggleTheme();
    expect(themeServiceMock.toggleTheme).toHaveBeenCalled();
  });
});
