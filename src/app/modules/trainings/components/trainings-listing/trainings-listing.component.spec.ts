import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsListingComponent } from './trainings-listing.component';

describe('TrainingsListingComponent', () => {
  let component: TrainingsListingComponent;
  let fixture: ComponentFixture<TrainingsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
