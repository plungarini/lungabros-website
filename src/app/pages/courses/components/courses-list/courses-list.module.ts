import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesListRoutingModule } from './courses-list-routing.module';
import { CoursesListComponent } from './courses-list.component';
import { ImgixAngularModule } from '@imgix/angular';
import { FiltersComponent } from './components/filters/filters.component';
import { CourseCardComponent } from './components/course-card/course-card.component';


@NgModule({
  declarations: [
    CoursesListComponent,
    FiltersComponent,
    CourseCardComponent,
  ],
  imports: [
    CommonModule,
    CoursesListRoutingModule,
    ImgixAngularModule,
  ]
})
export class CoursesListModule { }
