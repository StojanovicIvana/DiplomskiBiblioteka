import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Knjiga } from 'src/app/model/knjiga';
import { LibraryService } from 'src/app/library.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  id: number;
  knjiga: Knjiga = new Knjiga();
  korisnikID: number;
  autor: any;
  formatID?: number;
  dostupno?: number;
  uloga?: any;
  slika?: any;
  fajl?: string;
  iznajmljena?: boolean;

  constructor(private route: ActivatedRoute, private libraryService: LibraryService,
    private router: Router) {
    this.id = this.route.snapshot.params['id'];
    this.korisnikID = Number(sessionStorage.getItem('korisnikID'));
  }

  ngOnInit(): void {
    this.libraryService.getBookById(this.id).subscribe(data => {
      this.knjiga = data;
      this.formatID = data.format?.formatID;
      this.dostupno = data.dostupno;
      if (data.slika != null) {
        this.slika = 'data:image/jpeg;base64,' + data.slika;
      } else {
        this.slika = 'assets/noPhotoAvailable.png';
      }
      this.fajl = data.fajl;
      this.autor = this.knjiga.autor;
    });
    this.uloga = sessionStorage.getItem('uloga');
    this.vecIznajmljena();
  }

  vecIznajmljena(): void {
    this.libraryService.isItLent(this.id, this.korisnikID).subscribe(data => {
      if (data !== null) {
        console.log(data);
        this.iznajmljena = true;
      } else
        this.iznajmljena = false;
    });
  }

  rezervisi() {
    this.libraryService.newReservation(this.id, this.korisnikID).subscribe(data => {
      console.log(data);
      this.router.navigate(['profile']);
    });
  }

  iznajmi() {
    this.libraryService.newLend(this.id, this.korisnikID).subscribe(data => {
      console.log(data);
    });
    this.iznajmljena = true;
  }
}