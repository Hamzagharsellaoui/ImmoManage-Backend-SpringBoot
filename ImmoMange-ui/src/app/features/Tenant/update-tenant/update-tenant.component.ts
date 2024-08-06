import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TenantService } from '../../../services/services/TenantService';
import {ActivatedRoute, Router} from '@angular/router';
import { PropertyService } from "../../../services/services/propertyService";
import {Property} from "ng-openapi-gen/lib/property";
import {PropertyResponseDto} from "../../../services/models/property-response-dto";
import {TenantRequestDto} from "../../../services/models/tenant-request-dto";
import {UpdateTenant$Params} from "../../../services/fn/tenant-controller/update-tenant";

@Component({
  selector: 'app-update-tenant',
  templateUrl: './update-tenant.component.html',
  styleUrls: ['./update-tenant.component.scss']
})
export class UpdateTenantComponent implements OnInit {
  updateForm!: FormGroup;
  availableProperties: Map<number, string> = new Map();
  selectedPropertyId?: number;
  actualPropertyId!:number | undefined;
  actualPropertyAddress?:string;
  userID!:number;
  tenantID!:number;

  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    public dialogRef: MatDialogRef<UpdateTenantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private propertyService: PropertyService,
    private router:Router
  ) {}

  ngOnInit(): void {
    const { tenant,tenantID,user } = this.data;
    this.tenantID=tenantID;
    this.userID = user.id;
    this.actualPropertyAddress = tenant.address;
    this.propertyService.getAllProperties().subscribe({
      next: (res) => {
        res.data?.forEach((property: PropertyResponseDto) => {
          if(property.address===(tenant.address)){
            this.actualPropertyId=property.id;
          }
        })
      }
    })
    this.updateForm = this.fb.group({
      cin: [tenant.cin, [Validators.required, Validators.pattern(/^\d{8}$/)]],
      name: [tenant.name, Validators.required],
      email: [tenant.email, [Validators.required, Validators.email]],
      phoneNumber: [tenant.phoneNumber, [Validators.required, Validators.pattern(/^\d{8}$/)]],
      address: [tenant.address, Validators.required],
      managerName: [{ value: user.name, disabled: true }]
    });
    this.propertyService.getAllAvailableProperties().subscribe({
      next: (response) => {
        this.availableProperties = new Map<number, string>(
          Object.entries(response.data).map(([id, address]) => [Number(id), address])

        );
        if(this.actualPropertyId &&this.actualPropertyAddress != null){
          this.availableProperties.set(this.actualPropertyId, this.actualPropertyAddress);
        }
      },
      error: (err) => this.tenantService.addErrorMessage('Failed to load available properties.')
    });  }
  onAddressSelect(selectedAddress: string): void {
    const propertyId = [...this.availableProperties.entries()]
      .find(([_, address]) => address === selectedAddress)?.[0];
    if (propertyId !== undefined) {
      console.log(propertyId)
      this.actualPropertyId = propertyId;
      console.log('Selected Property ID:', this.selectedPropertyId);
    } else {
      this.tenantService.addErrorMessage('Selected address is not valid.');
    }
  }
  onSubmit(): void {
    if (this.updateForm.valid) {
      const { address, ...formValues } = this.updateForm.value;
      const updateData = {
        ...formValues,
        managerId: this.userID,
        actualPropertyId: this.actualPropertyId
      };
      const request: UpdateTenant$Params = {
        id: this.tenantID,
        body: updateData
      };
      this.tenantService.updateTenant(request).subscribe({
        next: () => {
          this.router.navigateByUrl("/AppUser/tenant");
          this.dialogRef.close(true);
        },
        error: err => {
          console.error('Error updating tenant', err);
        }
      });
    }
  }
}
