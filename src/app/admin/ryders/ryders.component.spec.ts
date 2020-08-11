import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RydersComponent } from './ryders.component';

describe('RydersComponent', () => {
  let component: RydersComponent;
  let fixture: ComponentFixture<RydersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RydersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RydersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
