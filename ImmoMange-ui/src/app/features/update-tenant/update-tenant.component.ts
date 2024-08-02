import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TenantService } from '../../services/services/TenantService';

@Component({
  selector: 'app-update-tenant',
  templateUrl: './update-tenant.component.html',
  styleUrls: ['./update-tenant.component.scss']
})
export class UpdateTenantComponent implements OnInit {
  updateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    public dialogRef: MatDialogRef<UpdateTenantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      cin: [this.data.tenant.cin],
      name: [this.data.tenant.name],
      email: [this.data.tenant.email],
      phoneNumber: [this.data.tenant.phoneNumber],
      actualPropertyAddress: [this.data.tenant.actualPropertyAddress],
      managerId: [this.data.tenant.managerId]
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.tenantService.updateTenant(this.data.tenant.id, this.updateForm.value).subscribe({
        next: () => {
          this.dialogRef.close(true); // Notify the parent component of the successful update
        },
        error: err => {
          console.error('Error updating tenant', err);
        }
      });
    }
  }
}
