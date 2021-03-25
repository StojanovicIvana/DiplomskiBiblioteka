import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from 'src/app/library.service';
import { Korisnik } from 'src/app/model/korisnik';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.css']
})
export class AllMembersComponent implements OnInit {

  clanovi?: Korisnik[];
  searchText = '';
  
  constructor(private libraryService: LibraryService, 
    private router: Router) { }

  ngOnInit(): void {
    this.getMembers();
  }

  private getMembers(){
    this.libraryService.getAllMembers().subscribe(data => {
      this.clanovi = data;
    });    
  }

  korisnikInfo(clanID: number) {
    console.log(clanID);
    this.router.navigate(['profile', clanID]);
  }

}
