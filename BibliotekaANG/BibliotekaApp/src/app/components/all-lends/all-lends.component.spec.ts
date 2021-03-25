import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLendsComponent } from './all-lends.component';

describe('AllLendsComponent', () => {
  let component: AllLendsComponent;
  let fixture: ComponentFixture<AllLendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
