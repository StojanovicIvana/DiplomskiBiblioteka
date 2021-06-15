import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from 'src/app/library.service';

@Component({
  selector: 'app-add-picture',
  templateUrl: './add-picture.component.html',
  styleUrls: ['./add-picture.component.css']
})
export class AddPictureComponent implements OnInit {

  odabranaSlika!: File;
  knjigaID: number;

  constructor(private libraryService: LibraryService, private route: ActivatedRoute,
    private router: Router) {
    this.knjigaID = this.route.snapshot.params['knjigaID'];
   }

  ngOnInit(): void {
  }
  
  public fileSelected(event: any) {
    console.log(event);
    this.odabranaSlika = event.target.files[0];
  }

  public savePicture() {
    const slika = new FormData();
    slika.append("slikaKnjige", this.odabranaSlika);
    this.libraryService.saveBookPicture(this.knjigaID, slika).subscribe( data => {
      console.log(data);
      this.router.navigate(['book-info', this.knjigaID]);
    })
  }

  public cancel() {
    this.router.navigate(['book-info', this.knjigaID]);
  }
}
