import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly storageKey = 'theme';

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.applyTheme(this.getPreferredTheme());

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        const storedTheme = this.getStoredTheme();
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
          this.applyTheme(this.getPreferredTheme());
        }
      });
  }

  getStoredTheme(): Theme | null {
    return localStorage.getItem(this.storageKey) as Theme | null;
  }

  setStoredTheme(theme: Theme): void {
    localStorage.setItem(this.storageKey, theme);
  }

  getPreferredTheme(): Theme {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  applyTheme(theme: Theme): void {
    const resolvedTheme =
      theme === 'auto'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme;

    this.document.documentElement.setAttribute('data-bs-theme', resolvedTheme);
  }

  setTheme(theme: Theme): void {
    this.setStoredTheme(theme);
    this.applyTheme(theme);
  }
}