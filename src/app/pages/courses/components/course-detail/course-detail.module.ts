import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CourseDetailComponent } from './course-detail.component';
import { ImgixAngularModule } from '@imgix/angular';
import { CourseGalleryComponent } from './components/course-gallery/course-gallery.component';
import { CourseSpecsComponent } from './components/course-specs/course-specs.component';
import { CourseHighlightsComponent } from './components/course-highlights/course-highlights.component';
import { CourseCertificationComponent } from './components/course-certification/course-certification.component';
import { HowToLearnComponent } from './components/how-to-learn/how-to-learn.component';
import { CourseAdviceComponent } from './components/course-advice/course-advice.component';


@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseGalleryComponent,
    CourseSpecsComponent,
    CourseHighlightsComponent,
    CourseCertificationComponent,
    HowToLearnComponent,
    CourseAdviceComponent,
  ],
  imports: [
    CommonModule,
    CourseDetailRoutingModule,
    ImgixAngularModule
  ]
})
export class CourseDetailModule { }
