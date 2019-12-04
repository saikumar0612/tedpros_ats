import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RestpassComponent } from './restpass.component';

describe('RestpassComponent', () => {
  let component: RestpassComponent;
  let fixture: ComponentFixture<RestpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RestpassComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestpassComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
