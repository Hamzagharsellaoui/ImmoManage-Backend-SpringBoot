import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {
  editProfileForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editProfileForm = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: [data.password, [Validators.required]],
      // phoneNumber: [data, Validators.required]
    });

    if (data.profileImage) {
      this.selectedImage = data.profileImage;
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // @ts-ignore
        this.selectedImage = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.editProfileForm.get('firstName')?.value);
      formData.append('lastName', this.editProfileForm.get('lastName')?.value);
      formData.append('email', this.editProfileForm.get('email')?.value);
      formData.append('phoneNumber', this.editProfileForm.get('phoneNumber')?.value);
      if (this.selectedImage) {
        formData.append('profileImage', this.selectedImage.toString());
      }
      this.dialogRef.close(formData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
