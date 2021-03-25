import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() { }

  isLoggedIn(): boolean {
    if (sessionStorage.getItem('korisnik')){
      return true;
    }
    else {
      return false;
    }
  }
}
