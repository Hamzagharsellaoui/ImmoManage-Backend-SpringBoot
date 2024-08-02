import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPropertieComponent } from './view-propertie.component';

describe('ViewPropertieComponent', () => {
  let component: ViewPropertieComponent;
  let fixture: ComponentFixture<ViewPropertieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPropertieComponent]
    });
    fixture = TestBed.createComponent(ViewPropertieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
