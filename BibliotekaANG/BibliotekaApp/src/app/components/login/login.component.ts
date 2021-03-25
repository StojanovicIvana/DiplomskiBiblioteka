import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { LibraryService } from 'src/app/library.service';
import { Korisnik } from 'src/app/model/korisnik';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  korisnik: Korisnik = new Korisnik();

  constructor(private libraryService: LibraryService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.libraryService.login(this.korisnik).subscribe(data => {
      console.log(data);
      if (data == null) {
        this.router.navigate(['/login']);
      } else {
        sessionStorage.setItem('korisnik', JSON.stringify(data));
        sessionStorage.setItem('uloga', data.uloga.imeUloge);
        sessionStorage.setItem('korisnikID', data.korisnikID);
        this.authService.isLoggedIn();
        console.log(this.authService.isLoggedIn());        
        this.router.navigate(['/library']);
      }
    })
  }

}
