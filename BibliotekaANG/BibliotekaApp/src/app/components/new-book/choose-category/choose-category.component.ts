import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from 'src/app/library.service';
import { Kategorija } from 'src/app/model/kategorija';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css']
})
export class ChooseCategoryComponent implements OnInit {

  knjigaID: number;
  sveKategorije: Kategorija[] = [];
  odabraneKategorije: Kategorija[] = [];
  checkedIDs: number[] = [];

  @Output() sendKategorije = new EventEmitter<string[]>();

  constructor(private libraryService: LibraryService, private route: ActivatedRoute,
    private router: Router) {
    this.knjigaID = this.route.snapshot.params['knjigaID'];
  }

  ngOnInit(): void {
    this.libraryService.getAllCategories().subscribe(data => {
      this.sveKategorije = data;
    })
    this.fetchSelectedItems()
    this.fetchCheckedIDs()
    console.log(this.knjigaID)
  }

  chooseCategory() {
    console.log(this.checkedIDs);
    console.log(this.odabraneKategorije);
    this.libraryService.sendChosenCategories(this.knjigaID, this.odabraneKategorije).subscribe(data => {
      console.log(data);
      this.router.navigate(['add-picture', this.knjigaID]);
    });
  }  

  changeSelection() {
    this.fetchSelectedItems();
    this.fetchCheckedIDs();
  }

  fetchSelectedItems() {
    this.odabraneKategorije = this.sveKategorije.filter((value, index) => {
      return value.isChecked
    });
  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.sveKategorije.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.kategorijaID);
      }
    });
    console.log(this.checkedIDs);
  }

}
