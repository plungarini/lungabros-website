import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Course } from '../../../../models/course.model';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  get isHighlighted(): boolean {
    return this.course?.category.includes('main') ? true : false;
  }

}
