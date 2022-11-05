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



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SectionOneComponent,
    ImageSlideshowComponent,
    BrandsComponent,
    SectionTwoComponent,
    SectionThreeComponent,
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