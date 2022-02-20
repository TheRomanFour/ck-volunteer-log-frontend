import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolonteriComponent } from './volonteri.component';

describe('VolonteriComponent', () => {
  let component: VolonteriComponent;
  let fixture: ComponentFixture<VolonteriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolonteriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VolonteriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
