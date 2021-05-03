import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewgradComponent } from './viewgrad.component';

describe('ViewgradComponent', () => {
  let component: ViewgradComponent;
  let fixture: ComponentFixture<ViewgradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewgradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewgradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
