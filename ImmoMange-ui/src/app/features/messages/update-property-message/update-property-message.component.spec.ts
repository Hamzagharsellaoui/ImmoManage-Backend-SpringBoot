import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePropertyMessageComponent } from './update-property-message.component';

describe('UpdatePropertyMessageComponent', () => {
  let component: UpdatePropertyMessageComponent;
  let fixture: ComponentFixture<UpdatePropertyMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePropertyMessageComponent]
    });
    fixture = TestBed.createComponent(UpdatePropertyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
