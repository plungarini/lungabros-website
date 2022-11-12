import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  {
    path: 'pietro-lungarini',
    loadChildren: () => import('./pages/pietro/pietro.module').then(m => m.PietroModule),
  },
  {
    path: 'samuele-lungarini',
    loadChildren: () => import('./pages/samuele/samuele.module').then(m => m.SamueleModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
