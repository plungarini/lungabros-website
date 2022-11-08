import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from './models/course.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styles: [],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  title = '';
  imgPath = '';

  course: Course | undefined;
  courseSub: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.courseSub = this.route.data.subscribe(({ course }) => {
      this.course = this.normCourse(course);
      this.cdRef.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.courseSub?.unsubscribe();
  }

  private normCourse(course: Course): Course {
    const gallery = course.gallery.sort((a, b) => {
      const normA = parseFloat(a.replace(/(?:[^0-9]*)/g, ''));
      const normB = parseFloat(b.replace(/(?:[^0-9]*)/g, ''));
      return normB - normA;
    });
    return {
      ...course,
      gallery
    }
  }

}
