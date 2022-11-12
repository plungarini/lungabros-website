import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PietroComponent } from './pietro.component';

const routes: Routes = [
  { path: '', component: PietroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PietroRoutingModule { }
