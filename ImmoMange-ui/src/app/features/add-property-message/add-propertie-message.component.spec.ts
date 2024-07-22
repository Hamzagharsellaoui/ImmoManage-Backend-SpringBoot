import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyMessageComponent } from './add-propertie-message.component';

describe('AddPropertieMessageComponent', () => {
  let component: AddPropertyMessageComponent;
  let fixture: ComponentFixture<AddPropertyMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPropertyMessageComponent]
    });
    fixture = TestBed.createComponent(AddPropertyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
