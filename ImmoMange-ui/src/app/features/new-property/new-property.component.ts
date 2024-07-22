import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyService} from "../../services/services/propertyService";
import {Router} from "@angular/router";
import {AuthService} from "../../services/services/auth-service.service";

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.scss']
})
export class NewPropertyComponent implements OnInit {
  addPropertyForm!: FormGroup;
  propertyEquipmentsFormGroup!: FormArray;
  errorMessage: Array<string> = [];

  constructor(private fb: FormBuilder, private propertyService: PropertyService, private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.addPropertyForm = this.fb.group({
      address: ['', Validators.required],
      description: ['', Validators.required],
      rentPrice: ['', Validators.required],
      propertyEquipmentsFormGroup: this.fb.array([this.createEquipmentFormGroup()])
    });
    this.propertyEquipmentsFormGroup = this.addPropertyForm.get('propertyEquipmentsFormGroup') as FormArray;
  }

  createEquipmentFormGroup(): FormGroup {
    return this.fb.group({
      equipmentName: ['', Validators.required]
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
    // this.errorMessage = [];
    // if (this.addPropertyForm.invalid) {
    //   this.addPropertyForm.markAllAsTouched();
    //   return;
    // }
    // const managerEmail = this.authService.getManagerEmail();
    // const addPropertyRequest = {...this.addPropertyForm.value, managerEmail: managerEmail};
    // this.propertyService.addProperty(addPropertyRequest).subscribe({
    //   next: () => {
    //     this.router.navigate(['addPropertyMessage']);
    //   },
    //   error: (err) => {
    //     if (err.status === 302) {
    //       this.addErrorMessage("There's already an employee with this email address.");
    //     } else if (err.error && err.error.validationErrors) {
    //       err.error.validationErrors.forEach((msg: string) => this.addErrorMessage(msg));
    //     } else {
    //       this.addErrorMessage('Property adding failed.');
    //     }
    //   }
    // });
  }
//
// this.authService.registerUser({ body: registrationRequest }).subscribe({
//   next: () => {
//     this.router.navigate(['properties']);
//   },
//   error: (err) => {
//     if (err.status === 302) {
//       this.addErrorMessage("There's already an employee with this email address.");
//     } else if (err.error && err.error.validationErrors) {
//       err.error.validationErrors.forEach((msg: string) => this.addErrorMessage(msg));
//     } else {
//       this.addErrorMessage('Registration failed.');
//     }
//   }
// });
}