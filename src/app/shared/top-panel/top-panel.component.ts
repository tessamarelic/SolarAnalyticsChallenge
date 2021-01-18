import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.css']
})
export class TopPanelComponent implements OnInit {
  theme = '';
  matIcon = '';

  constructor(
    private themeService: ThemeService
  ) {
  }

  ngOnInit(): void {
    this.theme = this.themeService.isDarkTheme() ? 'Dark' : 'Light';
    this.matIcon = this.themeService.isDarkTheme() ? 'brightness_low' : 'brightness_high';
  }

  toggleTheme(): void {
    if (this.themeService.isDarkTheme()) {
      this.theme = 'Light';
      this.matIcon = 'brightness_high';
      this.themeService.setLightTheme();
    } else {
      this.matIcon = 'brightness_low';
      this.theme = 'Dark';
      this.themeService.setDarkTheme();
    }
  }

}
