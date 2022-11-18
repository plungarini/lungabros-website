import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Course } from 'src/app/shared/models/course.model';
import { FirebaseExtendedService } from 'src/app/shared/services/firebase-extended.service';
import { FileHandle } from './pipes/drag-ndrop.directive';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  course: Course | undefined;
  allCourses: {
    id: string;
    title: string;
  }[] = [];
  filteredCourses: {
    id: string;
    title: string;
  }[] = [];
  allCategories = [
    'main',
    'specialty',
    'experience',
    'kids',
    'junior',
    'withDives',
    'dry',
  ];

  dbConnection: Subscription | undefined;

  fileDropper = new FormControl<FileHandle[]>([]);

  form = new FormGroup({
    id: new FormControl<string>('PADI® NOME_DEL_CORSO', [Validators.required]),
    hide: new FormControl<boolean>(true),
    title: new FormControl<string>('', [Validators.required]),
    bgImg: new FormControl<string>('', [Validators.required]),
    shortDesc: new FormControl<string>('', [Validators.required]),
    category: new FormControl<string[]>([]),
    desc: new FormControl<string>('', [Validators.required]),
    howToCert: new FormControl<string>('', [Validators.required]),
    courseAdvice: new FormControl<string[]>([], [Validators.required]),
    suggestedCourse: new FormControl<string[]>([], [Validators.required]),
    gallery: new FormControl<string[]>([], [Validators.required]),
    howToLearn: new FormGroup({
      eLearning: new FormControl<string>('', [Validators.required]),
      inPerson: new FormControl<string>('', [Validators.required]),
    }),
    specs: new FormGroup({
      foryou: new FormArray<FormControl<string>>(this.dummyFormStrArr(3), {
        updateOn: 'blur',
      }),
      learnto: new FormArray<FormControl<string>>(this.dummyFormStrArr(3), {
        updateOn: 'blur',
      }),
      specs: new FormGroup({
        time: new FormGroup({
          time: new FormControl<string>('', [Validators.required]),
          unit: new FormControl<'hours' | 'days'>('hours', [
            Validators.required,
          ]),
        }),
        elearningTime: new FormGroup({
          time: new FormControl<string>('', [Validators.required]),
          unit: new FormControl<'hours' | 'days'>('hours', [
            Validators.required,
          ]),
        }),
        dives: new FormControl<number | undefined>(undefined),
        depth: new FormControl<number | undefined>(undefined),
        age: new FormControl<number | undefined>(undefined),
        pre: new FormControl<string>('', [Validators.required]),
      }),
    }),
  });

  constructor(
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private db: FirebaseExtendedService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe(({ course }) => {
      this.course = this.normCourse(course);
      this.form.patchValue(this.course);
      this.cdRef.detectChanges();
    });

    this.dbConnection = this.db
      .getCol<Course>('courses')
      .subscribe((courses) => {
        this.allCourses = courses.map((c) => ({ id: c.id, title: c.title }));
        this.filteredCourses = this.allCourses;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.dbConnection?.unsubscribe();
  }

  fileDrop(event: FileHandle[], fileEvent?: Event): void {
    const mapFiles = (files: FileList | null) => {
      if (!files) return;
      const arr: FileHandle[] = [];
      for (let i = 0; i < files.length; i++) {
        arr.push({
          file: files[i],
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i])),
          isCover: false,
        });
      }
      return arr;
    };
    const files = fileEvent ?
      mapFiles((fileEvent.target as HTMLInputElement).files) :
      event.filter(f => f.file.type.includes('image'));
    if (!files || files?.length <= 0) return;
    const res = this.fileDropper.value;
    if (!res || res.length <= 0) {
      this.fileDropper.setValue([...files]);
      return;
    }
    files?.forEach(f => res.push(f));
  }

  deleteGalleryImage(index: number): void {
    this.fileDropper.value?.splice(index, 1);
    this.cdRef.detectChanges();
  }

  get publishCourse(): boolean {
    return !!!this.form.get('hide')?.value;
  }

  get specsForyou(): string[] {
    return this.form.get(['specs', 'foryou'])?.value || [];
  }

  get specsLearnto(): string[] {
    return this.form.get(['specs', 'learnto'])?.value || [];
  }

  get courseAdvices(): string[] {
    return this.form.get('courseAdvice')?.value || [];
  }
  get suggestedCourses(): string[] {
    return this.form.get('suggestedCourse')?.value || [];
  }

  setPublishStatus(value: boolean) {
    this.form.get('hide')?.patchValue(!value);
  }

  deleteFormStrArr(path: string | string[], i: number): void {
    (this.form.get(path) as FormArray)?.removeAt(i);
  }

  newDummyFormStrArr(path: string | string[]): void {
    const control = new FormControl<string>('', {
      nonNullable: true,
      updateOn: 'blur',
      validators: [Validators.required],
    });
    (this.form.get(path) as FormArray)?.push(control);
  }

  normSuggestedCoursesName(item: string): string {
    return (
      this.allCourses
        .find((c) => c.id.toLowerCase().trim() === item.toLowerCase().trim())
        ?.title.replace('PADI®', '')
        .trim() || ''
    );
  }

  filterSuggestedCourse(value: string, input?: HTMLInputElement): void {
    if (!value) {
      this.filteredCourses = this.allCourses;
      if (input) input.value = '';
      this.cdRef.detectChanges();
      return;
    }
    this.filteredCourses = this.allCourses.filter(
      (c) =>
        c.id.toLowerCase().trim().includes(value) ||
        c.title.toLowerCase().replace('padi®', '').trim().includes(value)
    );
    this.cdRef.detectChanges();
  }

  isSuggestedCourseSelected(item: string, path: 'advice' | 'suggest'): boolean {
    return !!this.form
      .get(path === 'suggest' ? 'suggestedCourse' : 'courseAdvice')
      ?.value?.includes(item);
  }

  selectSuggestedCourse(item: string, path: 'advice' | 'suggest'): void {
    if (this.isSuggestedCourseSelected(item, path))
      return this.removeSuggestedCourse(item, path);

    const arr =
      this.form.get(path === 'suggest' ? 'suggestedCourse' : 'courseAdvice')
        ?.value || [];
    arr.push(item);
    this.cdRef.detectChanges();
  }

  removeSuggestedCourse(
    item: string,
    path: 'advice' | 'suggest',
    event?: MouseEvent
  ): void {
    event?.preventDefault();
    event?.stopImmediatePropagation();
    const arr =
      this.form.get(path === 'suggest' ? 'suggestedCourse' : 'courseAdvice')
        ?.value || [];
    const i = arr.indexOf(item);
    arr.splice(i, 1);
    this.cdRef.detectChanges();
  }

  selectCategory(cat: string): void {
    if (this.isCatSelected(cat)) return;
    const currentCats =
      (this.form.get('category') as FormControl<string[]>)?.value || [];
    currentCats.push(cat);
    this.cdRef.detectChanges();
  }

  removeCat(cat: string, event?: MouseEvent): void {
    event?.preventDefault();
    event?.stopImmediatePropagation();
    const currentCats =
      (this.form.get('category') as FormControl<string[]>)?.value || [];
    const i = currentCats.indexOf(cat);
    currentCats.splice(i, 1);
    this.cdRef.detectChanges();
  }

  isCatSelected(cat: string): boolean {
    const catArr = (this.form.get('category') as FormArray)?.value;
    return (catArr || []).includes(cat);
  }

  normCategoryName(cat: string): string {
    switch (cat) {
      case 'main':
        return 'Principale';
      case 'specialty':
        return 'Specialità';
      case 'experience':
        return 'Esperienza';
      case 'kids':
        return 'Kids';
      case 'junior':
        return 'Junior';
      case 'withDives':
        return 'Con immersioni';
      case 'dry':
        return 'A secco';

      default:
        return '';
    }
  }

  submitForm(): void {
    console.log(this.form.value);
  }

  private normCourse(course: Course): Course {
    const gallery = course.gallery.sort((a, b) => {
      const normA = parseFloat(a.replace(/(?:[^0-9]*)/g, ''));
      const normB = parseFloat(b.replace(/(?:[^0-9]*)/g, ''));
      return normB - normA;
    });
    const specsTime = course.specs.specs.time;
    const time: Course['specs']['specs']['time'] =
      typeof (specsTime as any) === 'string'
        ? { time: specsTime as unknown as string, unit: 'days' }
        : specsTime;
    const specsElearningTime = course.specs.specs.elearningTime;
    const elearningTime: Course['specs']['specs']['time'] =
      typeof (specsElearningTime as any) === 'string'
        ? { time: specsElearningTime as unknown as string, unit: 'hours' }
        : specsElearningTime;
    const normedCourse: Course = { ...course, gallery };
    normedCourse.specs.specs.time = time;
    normedCourse.specs.specs.elearningTime = elearningTime;
    return normedCourse;
  }

  private dummyFormStrArr(num: number): FormControl<string>[] {
    const res: FormControl<string>[] = [];
    for (let i = 0; i < num; i++) {
      const control = new FormControl<string>('', {
        nonNullable: true,
        updateOn: 'blur',
        validators: [Validators.required],
      });
      res.push(control);
    }
    return res;
  }
}
