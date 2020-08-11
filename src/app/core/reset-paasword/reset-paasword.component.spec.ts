import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPaaswordComponent } from './reset-paasword.component';

describe('ResetPaaswordComponent', () => {
  let component: ResetPaaswordComponent;
  let fixture: ComponentFixture<ResetPaaswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPaaswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPaaswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
