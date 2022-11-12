import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  get age(): number {
    const myMonth = 6;
    const myDay = 20;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const res = year - 1999;
    return (month < myMonth) ? res - 1 : (month === myMonth) ? day < myDay ? res - 1 : res : res;
  }

}
