import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitansComponent } from './titans.component';

describe('TitansComponent', () => {
  let component: TitansComponent;
  let fixture: ComponentFixture<TitansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
