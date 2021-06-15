import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from 'src/app/model/knjiga';
import { LibraryService } from 'src/app/library.service'
import { Kategorija } from 'src/app/model/kategorija';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {
  
  knjige!: Knjiga[];
  searchText = '';
  kategorije!: Kategorija[];

  constructor(private libraryService:LibraryService,
    private router: Router) {
    
   }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllCategoties();
  }

  private getAllBooks() {
    this.libraryService.getAllBooks().subscribe(data => {
      this.knjige = data;
    });
  }

  private getAllCategoties() {
    this.libraryService.getAllCategories().subscribe(data => {
      this.kategorije = data;
    });
  }

  bookInfo(id?: number) {
    this.router.navigate(['book-info', id]);
  }
}
