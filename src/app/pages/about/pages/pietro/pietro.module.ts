import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PietroRoutingModule } from './pietro-routing.module';
import { PietroComponent } from './pietro.component';
import { ImgixAngularModule } from '@imgix/angular';
import { HeaderComponent } from './components/header/header.component';
import { ShortDescComponent } from './components/short-desc/short-desc.component';
import { BannerComponent } from './components/banner/banner.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { MyStoryComponent } from './components/my-story/my-story.component';


@NgModule({
  declarations: [
    PietroComponent,
    HeaderComponent,
    ShortDescComponent,
    BannerComponent,
    CertificationsComponent,
    MyStoryComponent
  ],
  imports: [
    CommonModule,
    PietroRoutingModule,
    ImgixAngularModule
  ]
})
export class PietroModule { }
