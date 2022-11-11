import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  animations: [
    trigger('noCourseAnim', [
      state('from', style({ left: '-100%', right: '140%' })),
      state('to', style({ right: '-100%', left: '140%' })),
      transition('from => to', [
        animate('2000ms ease-out')
      ]),
      transition('to => from', [
        animate('0ms')
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnInit {

  @Input('course') set setCourse(value: Course | undefined) {
    if (!value) return;
    this.course = value;
    this.times = 0;
  };
  
  course: Course | undefined;
  times = 100;
  counter = 0;
  state = 'to';

  constructor() { }

  ngOnInit(): void {
  }

  get isHighlighted(): boolean {
    return false;
  }

  onDone() {
    if (this.counter < this.times) {
      this.state = this.state === 'to' ? 'from' : 'to';
      this.counter++;
    }
  }

}
