import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FirebaseExtendedService } from 'src/app/shared/services/firebase-extended.service';
import { Course } from '../components/course-detail/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesResolver implements Resolve<Course | undefined> {

  constructor(private db: FirebaseExtendedService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Course | undefined> {
    const id = route.paramMap.get('id');
    const course = this.db.getDoc<Course>(`courses/${id}`)
    return course;
  }
}
