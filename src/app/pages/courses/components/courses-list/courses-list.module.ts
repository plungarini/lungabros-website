import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesListRoutingModule } from './courses-list-routing.module';
import { CoursesListComponent } from './courses-list.component';
import { SpecialtiesCardComponent } from './components/specialties-card/specialties-card.component';
import { ImgixAngularModule } from '@imgix/angular';


@NgModule({
  declarations: [
    CoursesListComponent,
    SpecialtiesCardComponent,
  ],
  imports: [
    CommonModule,
    CoursesListRoutingModule,
    ImgixAngularModule,
  ]
})
export class CoursesListModule { }
