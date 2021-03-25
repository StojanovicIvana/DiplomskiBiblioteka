import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from 'src/app/library.service';
import { Autor } from 'src/app/model/autor';
import { Format } from 'src/app/model/format';

@Component({
  selector: 'app-choose-author',
  templateUrl: './choose-author.component.html',
  styleUrls: ['./choose-author.component.css']
})
export class ChooseAuthorComponent implements OnInit {

  formatID: number;
  format: Format = new Format();
  autors: Autor[] = [];
  autor: Autor = new Autor();
  searchText = '';

  constructor(private libraryService: LibraryService, private route: ActivatedRoute) {
    this.formatID = this.route.snapshot.params['formatID'];
   }

  ngOnInit(): void {
    this.libraryService.getFormat(this.formatID).subscribe ( data => {
      this.format = data;
    })
    this.libraryService.getAllAuthors().subscribe(data => {
      this.autors = data;
    })
  }

  chooseAuthor() {
    console.log(this.autor)
  }

}
