import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  uloga?: any;
  korisnik?: any;
  korisnikID?: any;

  constructor(private router: Router, private authService: AuthService) {    
  }

  ngOnInit(): void {
    this.isLoggedIn  = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.uloga = sessionStorage.getItem('uloga');
      this.korisnik = sessionStorage.getItem('korisnik');
      this.korisnikID = sessionStorage.getItem('korisnikID');
    }
  }

  logout() {
    sessionStorage.clear();
    window.location.reload();
    this.router.navigate(['/library']);
  }

  userInfo() {
    this.router.navigate(['profile']);
  }

}
