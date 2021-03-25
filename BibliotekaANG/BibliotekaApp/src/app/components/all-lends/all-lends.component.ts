import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/library.service';
import { Pozajmica } from 'src/app/model/pozajmica';

@Component({
  selector: 'app-all-lends',
  templateUrl: './all-lends.component.html',
  styleUrls: ['./all-lends.component.css']
})
export class AllLendsComponent implements OnInit {

  pozajmice!: Pozajmica[];
  searchText = '';

  constructor(private libraryService: LibraryService) {
  }

  ngOnInit(): void {
    this.getAllLends();
  }

  private getAllLends() {
    this.libraryService.getAllLends().subscribe(data => {
      this.pozajmice = data;
    });
  }

  displayDate = false;
  odaberiDatum(pozajmicaID: number) {
    this.displayDate = !this.displayDate;
    sessionStorage.setItem("pozajmicaID", String(pozajmicaID));
  }

}
