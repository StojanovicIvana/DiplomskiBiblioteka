import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksByFormatComponent } from './books-by-format.component';

describe('BooksByFormatComponent', () => {
  let component: BooksByFormatComponent;
  let fixture: ComponentFixture<BooksByFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksByFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksByFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
