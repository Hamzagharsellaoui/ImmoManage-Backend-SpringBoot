import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PropertyService } from '../../../services/services/propertyService';
import { Router } from '@angular/router';
import { PropertyResponseDto } from '../../../services/models/property-response-dto';
import { UpdateProperty$Params } from '../../../services/fn/property-controller/update-property';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.scss']
})
export class UpdatePropertyComponent implements OnInit {
  updatePropertyForm!: FormGroup;
  propertyEquipmentsFormGroup!: FormArray;
  propertyImageFormGroup!: FormArray;
  errorMessage: Array<string> = [];
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  propertyID!: number;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    public dialogRef: MatDialogRef<UpdatePropertyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updatePropertyForm = this.fb.group({
      address: ['', Validators.required],
      description: ['', Validators.required],
      rentPrice: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      propertyEquipmentsFormGroup: this.fb.array([]),
      propertyImageFormGroup: this.fb.array([])
    });
  }

  createEquipmentFormGroup(equipment: any): FormGroup {
    return this.fb.group({
      equipmentName: [equipment.name]
    });
  }

  createImageFormGroup(image: any): FormGroup {
    return this.fb.group({
      imageUrl: [image.url]
    });
  }

  addEquipment() {
    this.propertyEquipmentsFormGroup.push(this.createEquipmentFormGroup({ name: '' }));
  }

  removeEquipment(index: number): void {
    if (this.propertyEquipmentsFormGroup.length > 1) {
      this.propertyEquipmentsFormGroup.removeAt(index);
    }
  }

  addImage() {
    this.propertyImageFormGroup.push(this.createImageFormGroup({ url: '' }));
  }

  removeImage(index: number) {
    if (this.propertyImageFormGroup.length > 1) {
      this.propertyImageFormGroup.removeAt(index);
      this.selectedFiles.splice(index, 1);
    }
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFiles[index] = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews[index] = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreviews[index] = '';
    }
  }

  onSubmit(): void {
    if (this.updatePropertyForm.valid) {
      const { propertyEquipmentsFormGroup, propertyImageFormGroup, ...formValues } = this.updatePropertyForm.value;
      const updateData = {
        ...formValues,
        propertyEquipmentDto: propertyEquipmentsFormGroup,
        propertyImages: propertyImageFormGroup.map((group: any) => group.imageUrl)
      } as unknown as UpdateProperty$Params;

      this.propertyService.updateProperty({
        id: this.propertyID,
        body: updateData,
      }).subscribe({
        next: (response) => {
          console.log('Property updated successfully:', response);
          this.dialogRef.close(response);
          this.router.navigate(['/properties']);
        },
        error: (error: any) => {
          this.errorMessage = error.error.errors;
        }
      });
    }
  }
}
