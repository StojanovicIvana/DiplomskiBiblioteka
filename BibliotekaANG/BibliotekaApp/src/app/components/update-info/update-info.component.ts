import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/library.service';
import { Korisnik } from 'src/app/model/korisnik';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();
  
  constructor(private libraryService: LibraryService) {     
  }

  ngOnInit(): void {
  }

  updateInfo() {
    const korisnikID = sessionStorage.getItem('korisnikID');
    this.libraryService.updateInfo(korisnikID, this.korisnik).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
    
  }

}
