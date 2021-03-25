import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from 'src/app/library.service';
import { Korisnik } from 'src/app/model/korisnik';

@Component({
  selector: 'app-new-librarian',
  templateUrl: './new-librarian.component.html',
  styleUrls: ['./new-librarian.component.css']
})
export class NewLibrarianComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  constructor(private router: Router,
    private libraryService: LibraryService) { }

  ngOnInit(): void {
  }

  newLibrarianForm() {
    console.log(this.korisnik);
    this.libraryService.newLibrarian(this.korisnik).subscribe(data => {      
      console.log(data);
      this.router.navigate(['/admin']);
    },
      error => {
        console.log(error);
      }
    )
  }



}
