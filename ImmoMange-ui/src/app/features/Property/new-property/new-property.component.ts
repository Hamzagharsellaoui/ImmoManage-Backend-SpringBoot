import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyService} from "../../../services/services/propertyService";
import {Router} from "@angular/router";
import {PropertyRequestDto} from "../../../services/models/property-request-dto";
import {AuthenticationService} from "../../../services/services/AuthenticationService";

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss']
})
export class NewPropertyComponent implements OnInit {
  addPropertyForm!: FormGroup;
  propertyEquipmentsFormGroup!: FormArray;
  propertyImageFormGroup!: FormArray;
  errorMessage: Array<string> = [];

  constructor(private fb: FormBuilder,
              private propertyService: PropertyService,
              private router: Router,
              private authService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.addPropertyForm = this.fb.group({
      address: ['', Validators.required],
      description: ['', Validators.required],
      rentPrice: ['', Validators.required],
      propertyEquipmentsFormGroup: this.fb.array([this.createEquipmentFormGroup()]),
      propertyImageFormGroup: this.fb.array([this.createImageFormGroup()])
    });
    this.propertyEquipmentsFormGroup = this.addPropertyForm.get('propertyEquipmentsFormGroup') as FormArray;
    this.propertyImageFormGroup = this.addPropertyForm.get('propertyImageFormGroup') as FormArray;
  }

  createEquipmentFormGroup(): FormGroup {
    return this.fb.group({
      equipmentName: ['']
    });
  }

  createImageFormGroup(): FormGroup {
    return this.fb.group({
      imageUrl: [''],
    });
  }

  addEquipment() {
    this.propertyEquipmentsFormGroup.push(this.createEquipmentFormGroup());
  }

  addErrorMessage(message: string): void {
    if (!this.errorMessage.includes(message)) {
      this.errorMessage.push(message);
    }
  }

  addProperty() {
    this.errorMessage = [];
    if (this.addPropertyForm.invalid) {
      this.addPropertyForm.markAllAsTouched();
      return;
    }
    let addPropertyRequest: PropertyRequestDto = this.addPropertyForm.value;
    this.propertyService.addProperty({body: addPropertyRequest}).subscribe({
      next: () => {
        this.router.navigate(['addPropertyMessage']);
      },
      error: (err) => {
        if (err.error && err.error.validationErrors) {
          err.error.validationErrors.forEach((msg: string) => this.addErrorMessage(msg));
        } else {
          this.addErrorMessage('Property adding failed.');
        }
      }
    });
  }

  removeEquipment(index: number): void {
    if (this.propertyEquipmentsFormGroup.length > 1) {
      this.propertyEquipmentsFormGroup.removeAt(index);
    }
  }

  removeImage(index: number) {
    if (this.propertyImageFormGroup.length > 1) {
      this.propertyImageFormGroup.removeAt(index);
    }
  }

  addImage() {
    this.propertyImageFormGroup.push(this.createImageFormGroup());
  }
}
