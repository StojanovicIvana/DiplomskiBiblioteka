import { Component, Input, OnInit, SecurityContext } from '@angular/core';
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
  formatID?: number;
  dostupno?: number;
  uloga?: any;
  slika?: any;
  fajl?: string;

  constructor(private route: ActivatedRoute, private libraryService: LibraryService,
    private router: Router) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.libraryService.getBookById(this.id).subscribe(data => {
      this.knjiga = data;
      this.formatID = data.format?.formatID;
      this.dostupno = data.dostupno;
      this.slika = 'data:image/jpeg;base64,' + data.slika;
      this.fajl = data.fajl;
    });
    this.uloga = sessionStorage.getItem('uloga');
  }

  rezervisi() {
    const korisnikID = Number(sessionStorage.getItem('korisnikID'));
    this.libraryService.newReservation(this.id, korisnikID).subscribe(data => {
      console.log(data);
      this.router.navigate(['profile']);
    });
  }

  displayLink = false;
  iznajmi() {
    this.displayLink = true;
    const korisnikID = Number(sessionStorage.getItem('korisnikID'));
    this.libraryService.newLend(this.id, korisnikID).subscribe(data => {
      console.log(data);
      //this.router.navigate(['profile']);
    });
  }

}