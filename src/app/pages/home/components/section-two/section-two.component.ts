import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-two',
  templateUrl: './section-two.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTwoComponent implements OnInit {

  showSpec = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSpecialties(): void {
    this.showSpec = true;
  }

}
