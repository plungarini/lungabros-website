import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit, OnDestroy {

  routerSub: Subscription| undefined;

  constructor(
    private titleService: Title,
    private router: Router,
  ) {
    this.titleService.setTitle(`LUNGABROS`);
  }

  ngOnInit(): void {
    this.routerSub = this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd),
    )
    .subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/') {
          this.titleService.setTitle(`LUNGABROS`);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

}
