import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
		path: '',
		loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
	},
  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule),
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
