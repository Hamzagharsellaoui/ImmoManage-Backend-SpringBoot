import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {UserService} from "../../services/services/UserService";
import {TenantService} from "../../services/services/TenantService";
import { GetTenant$Params } from 'src/app/services/fn/tenant-controller/get-tenant';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-propertie.component.html',
  styleUrls: ['./view-propertie.component.scss']
})
export class ViewPropertieComponent implements OnInit {
  property: any;
  managerName: string | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewPropertieComponent>,
    private userService: UserService,
    private tenantService: TenantService,
  ) {
    this.data = data.property;

  }

  ngOnInit(): void {
    console.log(this.data);
    this.userService.getUserInfo(this.data.managerID).subscribe({
      next: (res) => {
        this.managerName = res.data.name;
      }
    })
    console.log(this.data.tenantsIDS);
    this.data.tenantsIDS.forEach((ID: GetTenant$Params) => {
      console.log(ID);
      this.tenantService.getTenant(ID).subscribe({
        next: (res) => {

          console.log(ID);
          console.log(res.data?.name);
        },
        error: (err) => {
        }
      });
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onRent() {

  }

  viewTenant() {
      this.data.tenantId = Number(this.data.tenantId);
  }
}
