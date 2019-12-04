import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentFormComponent } from './represent-form.component';

describe('RepresentFormComponent', () => {
  let component: RepresentFormComponent;
  let fixture: ComponentFixture<RepresentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentFormComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
