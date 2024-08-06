import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyService} from "../../../services/services/propertyService";
import {Router} from "@angular/router";
import {AddProperty$Params} from "../../../services/fn/property-controller/add-property";
import {UserService} from "../../../services/services/UserService";
import {TokenService} from "../../../services/token/token.service";
import {MatDialog} from "@angular/material/dialog";
import {AddPropertyMessageComponent} from "../../messages/add-property-message/add-propertie-message.component";

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
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  user: any;
  fileNames: string[] = [];
  isPriceFocused = true;

  constructor(private fb: FormBuilder,
              private propertyService: PropertyService,
              private router: Router,
              private userService: UserService,
              private tokenService: TokenService,
              private dialog: MatDialog

  ) {
  }

  ngOnInit() {
    let id = this.tokenService.getUserIdFromToken();
    if (id) {
      this.userService.getUserInfo(id).subscribe({
        next: (res) => {
          if (res.data) {
            this.user = res.data;
            console.log('Current User Info:', this.user);
          } else {
            this.addErrorMessage('User info is undefined.');
          }
        },
      });
    }
    this.addPropertyForm = this.fb.group({
      address: ['', Validators.required],
      description: ['', Validators.required],
      rentPrice: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
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
      imageUrl: ['',],
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
  addProperty(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.errorMessage = [];
    if (this.addPropertyForm.invalid) {
      this.addPropertyForm.markAllAsTouched();
      return;
    }
    console.log(this.user)
    const propertyData = {
      address: this.addPropertyForm.get('address')?.value,
      description: this.addPropertyForm.get('description')?.value,
      rentPrice: this.addPropertyForm.get('rentPrice')?.value,
      propertyEquipmentDto: this.propertyEquipmentsFormGroup.value,
      managerID: this.user.id,
    };
    const formData = new FormData();
    formData.append('property', JSON.stringify(propertyData));
    this.selectedFiles.forEach((file, index) => {
      formData.append('imageFile', file, file.name);
    });
    const request: AddProperty$Params = {
      body:{
        property :formData.getAll('property').map((property) => {
          return property;
        }),
        imageFile:formData.getAll('imageFile').map((imageFile) => {
          return imageFile;
        })
      }
    }
    this.propertyService.addProperty(request).subscribe({
      next: (res) => {
        const message = res.message || 'Property added successfully.';
        const dialogRef = this.dialog.open(AddPropertyMessageComponent, {
          width: '1000px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: { message }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigateByUrl('property/addPropertyMessage');
        });
      },
      error: (err) => {
        let errorMessage = 'An unexpected error occurred.';
        if (err && err.error) {
          if (err.error.message) {
            errorMessage = err.error.message;
          } else if (err.error.validationErrors) {
            errorMessage = err.error.validationErrors.join(', ');
          } else {
            errorMessage = 'Property adding failed.';
          }
        }
        const dialogRef = this.dialog.open(AddPropertyMessageComponent, {
          width: '1000px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: { message: errorMessage }
        });
        dialogRef.afterClosed().subscribe(result => {
        });
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
      this.selectedFiles.splice(index, 1);
    }
  }
  addImage() {
    this.propertyImageFormGroup.push(this.createImageFormGroup());
  }
  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFiles[index] = file;
      this.fileNames[index] = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews[index] = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.fileNames[index] = 'No file chosen';
      this.imagePreviews[index] = '';
    }
  }  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  protected readonly document = document;
}
