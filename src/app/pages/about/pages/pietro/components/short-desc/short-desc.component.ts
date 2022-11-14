import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-short-desc',
  templateUrl: './short-desc.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortDescComponent implements OnInit {

  @Input() desc: string = '';
  @Input() name: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
