import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCandidatedocumentsComponent } from './upload-candidatedocuments.component';

describe('UploadCandidatedocumentsComponent', () => {
  let component: UploadCandidatedocumentsComponent;
  let fixture: ComponentFixture<UploadCandidatedocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCandidatedocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCandidatedocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
