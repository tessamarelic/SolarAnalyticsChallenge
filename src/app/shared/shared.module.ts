import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopPanelComponent} from './top-panel/top-panel.component';


@NgModule({
  declarations: [
    TopPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopPanelComponent
  ]
})
export class SharedModule { }
