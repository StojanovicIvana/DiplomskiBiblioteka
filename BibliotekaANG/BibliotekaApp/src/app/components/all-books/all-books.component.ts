import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from 'src/app/model/knjiga';
import { LibraryService } from 'src/app/library.service'

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  
  knjige!: Knjiga[];
  searchText = '';

  constructor(private libraryService:LibraryService,
    private router: Router) {
    
   }

  ngOnInit(): void {
    this.getAllBooks();
  }

  private getAllBooks() {
    this.libraryService.getAllBooks().subscribe(data => {
      this.knjige = data;
    });
  }

  bookInfo(id?: number) {
    this.router.navigate(['book-info', id]);
  }

}
