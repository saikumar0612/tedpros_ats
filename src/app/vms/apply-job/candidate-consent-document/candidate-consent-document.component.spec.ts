import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateConsentDocumentComponent } from './candidate-consent-document.component';

describe('CandidateConsentDocumentComponent', () => {
  let component: CandidateConsentDocumentComponent;
  let fixture: ComponentFixture<CandidateConsentDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateConsentDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateConsentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
