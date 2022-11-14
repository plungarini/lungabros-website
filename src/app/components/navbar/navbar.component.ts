import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  menuAnimationOpen = false;

  navigation = [
    { name: 'Home', url: '' },
    { name: 'Corsi', url: 'courses' },
    { name: 'About Us', url: 'about' },
    { name: 'Contatti', url: 'contact' },
  ];

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  toggleMenu(state?: boolean): void {
    this.menuOpen = state !== undefined ? state : !this.menuOpen;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.menuAnimationOpen = state !== undefined ? state : !this.menuOpen;
    }, 300);
  }

}
