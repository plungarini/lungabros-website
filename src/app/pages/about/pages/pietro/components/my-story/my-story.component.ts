import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-story',
  templateUrl: './my-story.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyStoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
