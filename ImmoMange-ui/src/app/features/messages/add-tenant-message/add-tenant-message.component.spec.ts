import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenantMessageComponent } from './add-tenant-message.component';

describe('AddTenantMessageComponent', () => {
  let component: AddTenantMessageComponent;
  let fixture: ComponentFixture<AddTenantMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTenantMessageComponent]
    });
    fixture = TestBed.createComponent(AddTenantMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
