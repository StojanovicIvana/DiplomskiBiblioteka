import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autor } from 'src/app/model/autor';
import { LibraryService } from 'src/app/library.service';

@Component({
  selector: 'app-new-author',
  templateUrl: './new-author.component.html',
  styleUrls: ['./new-author.component.css']
})
export class NewAuthorComponent implements OnInit {

  autor: Autor = new Autor();
  constructor(private libraryService: LibraryService,
    private router: Router) { }

  ngOnInit(): void {
  }

  newAuthorForm() {
    console.log(this.autor);
    this.saveAuthor();
  }

  saveAuthor() {
    this.libraryService.newAuthor(this.autor).subscribe( data => {
      console.log(data);
      this.router.navigate(['/library']);
    },
    error => console.log(error));
  }

}
