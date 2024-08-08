import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTenantMessageComponent } from './delete-tenant-message.component';

describe('DeleteTenantMessageComponent', () => {
  let component: DeleteTenantMessageComponent;
  let fixture: ComponentFixture<DeleteTenantMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTenantMessageComponent]
    });
    fixture = TestBed.createComponent(DeleteTenantMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
