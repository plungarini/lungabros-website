import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseExtendedService } from 'src/app/shared/services/firebase-extended.service';
import { Course } from '../../models/course.model';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styles: [],
})
export class CoursesListComponent implements OnInit, OnDestroy {
  title = 'I nostri corsi'
  subtitle = 'Questi sono tutti i corsi che offriamo, selezionane uno per vedere maggiori informazioni.';
  imgPath = 'gallery/slide-5.webp';

  courseList: Course[] = [];
  courseSub: Subscription | undefined;

  constructor(
    private db: FirebaseExtendedService,
    private headerService: HeaderService,
    ) { }

  ngOnInit(): void {
    this.courseSub = this.db.getCol<Course>('courses').subscribe((courses) => {
      this.courseList = this.normCourseList(courses);
      this.headerService.setHeader(this.title, this.imgPath, this.subtitle);
    });
  }

  ngOnDestroy(): void {
    this.courseSub?.unsubscribe();
  }

  normCourseList(courses: Course[]): Course[] {
    const arr = courses.sort((a, b) => {
      const incl = (c: Course, str: string) => c.category.includes(str);
      const normCat = (c: Course) => {
        return incl(c, 'main') ? (
          incl(c, 'one') ? 1
          : incl(c, 'two') ? 2
          : incl(c, 'three') ? 3
          : incl(c, 'four') ? 4
          : 5
        ) : incl(c, 'specialty') ? 6
        : incl(c, 'kids') ? 7
        : 8;
      };
      return normCat(a) - normCat(b);
    });
    return arr;
  }

}
