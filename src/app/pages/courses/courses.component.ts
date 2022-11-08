import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [''],
})
export class CoursesComponent implements OnInit, OnDestroy {
  title = '';
  subtitle = '';
  imgPath = '';

  courseSub: Subscription | undefined;

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.children[0]?.data.subscribe(({ course }) => {
      if (!course) return;
      if (course.title) this.title = course.title;
      if (course.bgImg) this.imgPath = course.bgImg;
      this.cdRef.detectChanges();
    })
  }

  ngOnDestroy(): void {
    this.courseSub?.unsubscribe();
  }

  routeChanges(component: any): void {
    this.title = component.title || '';
    this.subtitle = component.subtitle || '';
    if (component.imgPath) this.imgPath = component.imgPath;
    this.cdRef.detectChanges();
  }

}
