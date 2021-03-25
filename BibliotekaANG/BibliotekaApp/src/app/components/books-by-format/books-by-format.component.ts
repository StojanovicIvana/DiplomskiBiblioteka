import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from 'src/app/library.service';
import { Knjiga } from 'src/app/model/knjiga';
import { Pozajmica } from 'src/app/model/pozajmica';

@Component({
  selector: 'app-books-by-format',
  templateUrl: './books-by-format.component.html',
  styleUrls: ['./books-by-format.component.css']
})
export class BooksByFormatComponent implements OnInit {

  knjige!: Knjiga[];
  searchText = '';

  idClana: number;

  pozajmica: Pozajmica = new Pozajmica();

  constructor(private libraryService: LibraryService,
    private router: Router, private route: ActivatedRoute) {
    this.idClana = this.route.snapshot.params['clanID'];
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  private getAllBooks() {
    this.libraryService.getBooksByFormat(1).subscribe(data => {
      this.knjige = data;
    });
  }


  iznajmi(idKnjige: number) {
    this.libraryService.newLend(idKnjige, this.idClana).subscribe(data => {
      console.log(data);
      this.router.navigate(['all-lends']);
    });
  }

}
