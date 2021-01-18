import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopPanelComponent} from './top-panel/top-panel.component';
import {MatButtonModule} from '@angular/material/button';
import {ThemeService} from '../services/theme.service';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    TopPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopPanelComponent
  ],
  providers: [
    ThemeService
  ]
})
export class SharedModule { }
