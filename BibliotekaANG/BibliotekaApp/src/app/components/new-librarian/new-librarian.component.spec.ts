import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLibrarianComponent } from './new-librarian.component';

describe('NewLibrarianComponent', () => {
  let component: NewLibrarianComponent;
  let fixture: ComponentFixture<NewLibrarianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLibrarianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
