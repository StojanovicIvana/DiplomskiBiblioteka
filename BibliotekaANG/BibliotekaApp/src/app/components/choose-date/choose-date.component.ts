import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/library.service';

@Component({
  selector: 'app-choose-date',
  templateUrl: './choose-date.component.html',
  styleUrls: ['./choose-date.component.css']
})
export class ChooseDateComponent implements OnInit {

  datumVracanja = '';

  constructor(private libraryService:LibraryService) {
    
   }

  ngOnInit(): void {
  }

  potvrdiDatum() {
    console.log(this.datumVracanja);
    console.log(typeof(this.datumVracanja));
    const pozajmicaID = sessionStorage.getItem("pozajmicaID");
    this.libraryService.returnBook(Number(pozajmicaID), this.datumVracanja).subscribe( data => {
      console.log(data);
      window.location.reload();
    });
  }

}
