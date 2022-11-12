import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamueleComponent } from './samuele.component';

const routes: Routes = [
  { path: '', component: SamueleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SamueleRoutingModule { }
