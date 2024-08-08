import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePropertyMessageComponent } from './delete-property-message.component';

describe('DeletePropertyMessageComponent', () => {
  let component: DeletePropertyMessageComponent;
  let fixture: ComponentFixture<DeletePropertyMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePropertyMessageComponent]
    });
    fixture = TestBed.createComponent(DeletePropertyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
