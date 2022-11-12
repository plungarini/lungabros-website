import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, map, Observable, startWith, Subscription } from 'rxjs';
import { FirebaseExtendedService } from 'src/app/shared/services/firebase-extended.service';

interface Certification {
  title: string;
  priority?: number;
}

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

  certsSub: Subscription | undefined;
  certifications: Certification[] = [];

  cardsCountMobile = 4;

  mediaSub: Subscription | undefined;
  isMobile = false;

  constructor(
    private db: FirebaseExtendedService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.certsSub = this.db.getCol<Certification>('certifications/pietro/certs').subscribe(certs => {
      this.certifications = certs.sort((a, b) => (a?.priority || 40) - (b?.priority || 40));
      this.cdRef.detectChanges();
    });

    this.mediaSub = this.media('(max-width: 768px)').subscribe((matches) => {
      this.isMobile = matches;
      this.cdRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.certsSub?.unsubscribe();
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
