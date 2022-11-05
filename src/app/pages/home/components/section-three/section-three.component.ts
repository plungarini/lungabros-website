import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-three',
  templateUrl: './section-three.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionThreeComponent implements OnInit {

  showSpec = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSpecialties(): void {
    this.showSpec = true;
  }

}
