import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit, OnDestroy {

  routerSub: Subscription| undefined;
  isAdminArea = false;

  constructor(
    private titleService: Title,
    private router: Router,
    private cdRef: ChangeDetectorRef,
  ) {
    this.titleService.setTitle(`LUNGABROS`);
  }

  ngOnInit(): void {
    this.routerSub = this.router.events
    .pipe(
      filter((event) => event instanceof NavigationStart),
    )
    .subscribe(e => {
      if (e instanceof NavigationStart) {
        if (e.url === '/') {
          this.titleService.setTitle(`LUNGABROS`);
        } if (e.url.includes('admin') || e.url.includes('login')) {
          this.isAdminArea = true;
          this.cdRef.detectChanges();
        } else {
          this.isAdminArea = false;
          this.cdRef.detectChanges();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

}
