import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferletterInfoComponent } from './offerletter-info.component';

describe('OfferletterInfoComponent', () => {
  let component: OfferletterInfoComponent;
  let fixture: ComponentFixture<OfferletterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferletterInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferletterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
