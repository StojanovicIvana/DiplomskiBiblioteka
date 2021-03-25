import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Knjiga } from 'src/app/model/knjiga';
import { LibraryService } from 'src/app/library.service';
import { Format } from 'src/app/model/format';
import { Autor } from 'src/app/model/autor';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  formatID: number;
  format: Format = new Format();
  autorID: number;
  autor: Autor = new Autor();
  knjiga: Knjiga = new Knjiga();

  constructor(private libraryService: LibraryService, private route: ActivatedRoute,
    private router: Router) {
    this.formatID = this.route.snapshot.params['formatID'];
    this.autorID = this.route.snapshot.params['autorID'];
  }

  ngOnInit(): void {
    this.libraryService.getFormat(this.formatID).subscribe(data => {
      this.format = data;
    });
    this.libraryService.getAuthor(this.autorID).subscribe(data => {
      this.autor = data;
    });
  }

  onSubmit(): void {
    this.knjiga.format = this.format;
    this.knjiga.autor = this.autor;
    
    this.libraryService.newBook(this.knjiga).subscribe(response => {
      this.knjiga = response;
      this.router.navigate(['choose-category', this.knjiga.knjigaID]);           
    })
  }

}
