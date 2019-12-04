import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BulkEmailComponent } from './bulk-email.component';

describe('BulkEmailComponent', () => {
  let component: BulkEmailComponent;
  let fixture: ComponentFixture<BulkEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BulkEmailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkEmailComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
