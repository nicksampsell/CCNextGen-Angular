import { Component, Input, OnInit } from '@angular/core';
import { ThemeService, Theme } from './theme.service';

@Component({
  selector: 'theme-switcher',
  templateUrl: './theme-switcher.component.html'
})
export class ThemeSwitcher implements OnInit {

  activeTheme!: Theme;
  @Input() inSidebar:boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.activeTheme = this.themeService.getPreferredTheme();
  }

  setTheme(theme: Theme): void {
    this.activeTheme = theme;
    this.themeService.setTheme(theme);
  }

  toggleTheme()
  {
    if (this.activeTheme === 'light') {
      this.setTheme('dark');
    } 

    else {
      this.setTheme('light');
    }
  }
}
