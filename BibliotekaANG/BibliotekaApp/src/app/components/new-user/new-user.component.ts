import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from 'src/app/library.service';
import { Korisnik } from 'src/app/model/korisnik';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  constructor(private libraryService: LibraryService,
    private router: Router) { }

  ngOnInit(): void {
  }

  newMemberForm() {
    console.log(this.korisnik);
    this.libraryService.newMember(this.korisnik).subscribe(data => {      
      console.log(data);
      this.router.navigate(['/all-members']);
    },
      error => {
        console.log(error);
      }
    )
  }


}
