import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/library.service';
import { Korisnik } from 'src/app/model/korisnik';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  bibliotekari?: Korisnik[];
  searchText = '';
  
  constructor(private libraryService: LibraryService) { }

  ngOnInit(): void {
    this.getLibrarians();
  }

  private getLibrarians(){
    this.libraryService.getLibrarianList().subscribe(data => {
      console.log(data);
      this.bibliotekari = data;
    });    
  }

  deleteLibrarian(id: number){
    this.libraryService.deleteLibrarian(id).subscribe( data => {
      console.log(data);
      this.getLibrarians();
    });
  }

}