import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAuthorComponent } from './choose-author.component';

describe('ChooseAuthorComponent', () => {
  let component: ChooseAuthorComponent;
  let fixture: ComponentFixture<ChooseAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
