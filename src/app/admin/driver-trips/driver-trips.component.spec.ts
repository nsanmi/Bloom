import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTripsComponent } from './driver-trips.component';

describe('DriverTripsComponent', () => {
  let component: DriverTripsComponent;
  let fixture: ComponentFixture<DriverTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverTripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
