import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles.component';
import { SicurezzaComponent } from './pages/sicurezza/sicurezza.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    children: [
      {
        path: 'importanza-della-sicurezza',
        component: SicurezzaComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
