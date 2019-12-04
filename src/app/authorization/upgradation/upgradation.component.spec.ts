import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UpgradationComponent } from './upgradation.component';

describe('UpgradationComponent', () => {
  let component: UpgradationComponent;
  let fixture: ComponentFixture<UpgradationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpgradationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradationComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
