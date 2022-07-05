import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationListingComponent } from './education-listing.component';

describe('EducationListingComponent', () => {
  let component: EducationListingComponent;
  let fixture: ComponentFixture<EducationListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
