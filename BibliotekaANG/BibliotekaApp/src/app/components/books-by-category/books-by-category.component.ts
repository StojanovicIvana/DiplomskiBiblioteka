import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from 'src/app/library.service';
import { Kategorija } from 'src/app/model/kategorija';
import { Knjiga } from 'src/app/model/knjiga';

@Component({
  selector: 'app-books-by-category',
  templateUrl: './books-by-category.component.html',
  styleUrls: ['./books-by-category.component.css']
})
export class BooksByCategoryComponent implements OnInit {

  knjigePoKategoriji!: Knjiga[];
  searchText = '';
  kategorije!: Kategorija[];

  constructor(private libraryService:LibraryService,
    private router: Router, private route: ActivatedRoute) {
    
   }

  ngOnInit(): void {
    this.getBooksByCategory(this.route.snapshot.params['id']);
    this.getAllCategoties();
  }

  private getBooksByCategory(id: number) {
    this.libraryService.getBooksByCategory(id).subscribe(data => {
      this.knjigePoKategoriji = data;
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
