import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendareventsComponent } from './calendarevents.component';

describe('CalendareventsComponent', () => {
  let component: CalendareventsComponent;
  let fixture: ComponentFixture<CalendareventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendareventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendareventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
