import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SamueleRoutingModule } from './samuele-routing.module';
import { SamueleComponent } from './samuele.component';


@NgModule({
  declarations: [
    SamueleComponent
  ],
  imports: [
    CommonModule,
    SamueleRoutingModule
  ]
})
export class SamueleModule { }
