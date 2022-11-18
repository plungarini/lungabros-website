import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CourseDetailComponent } from './course-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { DragNdropDirective } from './pipes/drag-ndrop.directive';
import { ImgixAngularModule } from '@imgix/angular';


@NgModule({
  declarations: [
    CourseDetailComponent,
    DragNdropDirective
  ],
  imports: [
    CommonModule,
    CourseDetailRoutingModule,
    ReactiveFormsModule,
    ImgixAngularModule,
    provideStorage(() => getStorage()),
  ]
})
export class CourseDetailModule { }
