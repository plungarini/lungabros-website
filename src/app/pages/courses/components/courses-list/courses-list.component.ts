import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styles: [],
})
export class CoursesListComponent implements OnInit {
  title = 'I nostri corsi'
  subtitle = 'Questi sono tutti i corsi che offriamo, selezionane uno per vedere maggiori informazioni.';
  imgPath = 'gallery/slide-5.webp';

  constructor() { }

  ngOnInit(): void {
  }

}
