import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { fromEvent, map, Observable, startWith, Subscription } from 'rxjs';
import { FirebaseExtendedService } from 'src/app/shared/services/firebase-extended.service';
import { Course } from '../../../../shared/models/course.model';
import { CourseFilters } from '../../models/course-filters.model';
import { HeaderService } from '../../services/header.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit, OnDestroy {
  title = 'I nostri corsi';
  subtitle =
    'Questi sono tutti i corsi che offriamo, selezionane uno per vedere maggiori informazioni.';
  imgPath = 'gallery/slide-5.webp';

  courseList: Course[] = [];
  filteredCourses: Course[] = [];
  filters: CourseFilters = { category: [] };
  courseSub: Subscription | undefined;
  searchSub: Subscription | undefined;
  mediaSub: Subscription | undefined;
  itemsPerPage = 9;
  isMobile = false;
  mobileCourseCount = 4;
  searchBar = new FormControl('');
  courseLoaded = false;
  filtersPopupOpen = false;
  page = 1;

  constructor(
    private db: FirebaseExtendedService,
    private headerService: HeaderService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.headerService.setHeader(this.title, this.imgPath, this.subtitle);
    this.cdRef.detectChanges();

    this.courseSub = this.db.getCol<Course>('courses').subscribe((courses) => {
      this.courseLoaded = true;
      this.courseList = this.sortCourses(courses.filter((c) => !c.hide));
      this.filterSidebar(this.filters);
    });

    this.searchSub = this.searchBar.valueChanges.subscribe((value) => {
      this.filterSearch(value || '');
    });

    this.mediaSub = this.media('(max-width: 768px)').subscribe((matches) => {
      this.itemsPerPage = matches ? 500 : 9;
      this.isMobile = matches;
      this.mobileCourseCount = matches ? 4 : this.mobileCourseCount;
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.courseSub?.unsubscribe();
    this.searchSub?.unsubscribe();
    this.mediaSub?.unsubscribe();
  }

  media(query: string): Observable<boolean> {
    const mediaQuery = window.matchMedia(query);
    return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
      startWith(mediaQuery),
      map((list: MediaQueryList) => list.matches)
    );
  }

  sortCourses(courses: Course[]): Course[] {
    const arr = courses.sort((a, b) => {
      const incl = (c: Course, str: string) => c.category.includes(str);
      const normCat = (c: Course) => {
        return incl(c, 'main')
          ? incl(c, 'one')
            ? 1
            : incl(c, 'two')
            ? 2
            : incl(c, 'three')
            ? 3
            : incl(c, 'four')
            ? 4
            : 5
          : incl(c, 'experience')
          ? 6
          : incl(c, 'specialty')
          ? 7
          : incl(c, 'junior')
          ? 8
          : incl(c, 'kids')
          ? 9
          : 10;
      };
      return normCat(a) - normCat(b);
    });
    return arr;
  }

  trackBy(i: number, item: Course): string {
    return item.id;
  }

  clearFilters(): void {
    this.searchBar.patchValue('');
    this.filterSidebar();
  }

  filterSidebar(filters?: CourseFilters): void {
    this.filteredCourses = this.courseList;
    if (!filters) {
      this.filtersPopupOpen = false;
      this.mobileCourseCount = 4;
      this.cdRef.detectChanges();
      return;
    }
    this.filters = filters;
    filters.category.forEach((f) => {
      if (f.enabled) {
        this.filteredCourses = this.filteredCourses.filter((c) =>
          c.category
            .map((item) => item.toLowerCase())
            .includes(f.name.toLowerCase().trim())
        );
      }
    });
    this.filtersPopupOpen = false;
    this.mobileCourseCount = 4;
    this.cdRef.detectChanges();
  }

  changePage(page: number, el: HTMLElement) {
    this.page = page;
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    this.cdRef.detectChanges();
  }

  get fakeCourses(): any[] {
    return Array(9);
  }

  private filterSearch(value: string): void {
    const normValue = value ? value.toLowerCase().trim() : '';
    this.filterSidebar(this.filters);
    this.filteredCourses = this.filteredCourses.filter(
      (c) =>
        c.id.toLowerCase().includes(normValue) ||
        c.title.toLowerCase().replace('padi®', '').includes(normValue)
    );
    this.mobileCourseCount = 4;
    this.cdRef.detectChanges();
  }
}
