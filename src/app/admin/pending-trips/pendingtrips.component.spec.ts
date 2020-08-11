import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTripsComponent } from './pendingtrips.component';

describe('TripsComponent', () => {
  let component: PendingTripsComponent;
  let fixture: ComponentFixture<PendingTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PendingTripsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
