import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from 'src/app/library.service';
import { Korisnik } from 'src/app/model/korisnik';
import { Pozajmica } from 'src/app/model/pozajmica';
import { Rezervacija } from 'src/app/model/rezervacija';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  uloga?: any;
  pozajmice!: Pozajmica[];
  rezervacije!: Rezervacija[];
  id: number;
  searchText = '';

  constructor(private libraryService: LibraryService,
    private route: ActivatedRoute) {
    this.uloga = sessionStorage.getItem('uloga');
    if (this.uloga == "Clan") {
      this.id = Number(sessionStorage.getItem('korisnikID'));
    } else {
      this.id = this.route.snapshot.params['clanID'];
    }
    this.libraryService.getMember(this.id).subscribe(data => {
      this.korisnik = data;
    });
  }

  ngOnInit(): void {
    this.getReservations();
    this.getLends();
  }

  private getLends() {
    this.libraryService.getLendsForMember(this.id).subscribe(data => {
      this.pozajmice = data;
      console.log(data);
    });
  }

  private getReservations() {
    this.libraryService.getReservationsForMember(this.id).subscribe(data => {
      this.rezervacije = data;
      console.log(data);
    });
  }

  deleteReservation(id: number) {
    this.libraryService.deleteReservation(id).subscribe(data => {
      console.log(data);
      this.getReservations();
    });
  }

  displayUpdate = false;
  updateMember() {
    this.displayUpdate = !this.displayUpdate;
  }

  displayBooks = false;
  lendBook() {
    this.displayBooks = !this.displayBooks;
  }
}
