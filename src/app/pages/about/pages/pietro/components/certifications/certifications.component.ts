import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, map, Observable, startWith, Subscription } from 'rxjs';
import { Certification } from '../../models/curriculum.model';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificationsComponent implements OnInit, OnDestroy {

  @Input() certs: Certification[] = [];

  mediaSub: Subscription | undefined;
  isMobile = false;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.mediaSub = this.media('(max-width: 768px)').subscribe((matches) => {
      this.isMobile = matches;
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.mediaSub?.unsubscribe();
  }

  media(query: string): Observable<boolean> {
    const mediaQuery = window.matchMedia(query);
    return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
      startWith(mediaQuery),
      map((list: MediaQueryList) => list.matches)
    );
  }

}
