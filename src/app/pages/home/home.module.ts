import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SectionOneComponent } from './components/section-one/section-one.component';
import { ImageSlideshowComponent } from './components/image-slideshow/image-slideshow.component';
import { SectionTwoComponent } from './components/section-two/section-two.component';
import { ImgixAngularModule } from '@imgix/angular';
import { BrandsComponent } from './components/brands/brands.component';
import { SectionThreeComponent } from './components/section-three/section-three.component';
import { SectionFourComponent } from './components/section-four/section-four.component';
import { BannerComponent } from './components/banner/banner.component';
import { SpecialtiesCardComponent } from './components/section-two/components/specialties-card/specialties-card.component';
import { CourseCardComponent } from './components/section-two/components/course-card/course-card.component';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SectionOneComponent,
    ImageSlideshowComponent,
    BrandsComponent,
    SectionTwoComponent,
    SectionThreeComponent,
    SectionFourComponent,
    BannerComponent,
    SpecialtiesCardComponent,
    CourseCardComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ImgixAngularModule
  ],
  providers: [
  ]
})
export class HomeModule { }
