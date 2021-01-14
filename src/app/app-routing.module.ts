import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../app/features/home/home.module').then(mod => mod.HomeModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
