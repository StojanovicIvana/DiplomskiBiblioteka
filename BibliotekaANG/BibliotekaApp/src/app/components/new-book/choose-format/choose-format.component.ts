import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/library.service';
import { Format } from 'src/app/model/format';

@Component({
  selector: 'app-choose-format',
  templateUrl: './choose-format.component.html',
  styleUrls: ['./choose-format.component.css']
})
export class ChooseFormatComponent implements OnInit {

  formats!: Format[];
  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.libraryService.getAllFormats().subscribe(formats => {
      this.formats = formats;
    })
  }
}
