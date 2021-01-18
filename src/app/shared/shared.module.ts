import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopPanelComponent} from './top-panel/top-panel.component';
import {ThemeService} from '../services/theme.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    TopPanelComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    TopPanelComponent,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    ThemeService
  ]
})
export class SharedModule { }
