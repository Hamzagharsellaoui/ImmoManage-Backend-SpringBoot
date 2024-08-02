import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from "../../../services/services/UserService";
import { TenantService } from "../../../services/services/TenantService";
import { GetTenant$Params } from 'src/app/services/fn/tenant-controller/get-tenant';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-propertie.component.html',
  styleUrls: ['./view-propertie.component.scss']
})
export class ViewPropertieComponent implements OnInit {
  property: any;
  managerName: string | undefined;
  private tenantList: GetTenant$Params[] = [];
  protected tenantNames: string[]=[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewPropertieComponent>,
    private userService: UserService,
    private tenantService: TenantService,
  ) {
    this.data = data.property;
  }

  ngOnInit(): void {
    this.userService.getUserInfo(this.data.managerID).subscribe({
      next: (res) => {
        this.managerName = res.data.name;
      }
    });
    this.tenantList = this.data.tenantsIDS.map((id: number) => ({ id: id }));
    console.log("Tenant IDs received:", this.tenantList);
    if (this.tenantList) {
      this.tenantList.forEach((ID: GetTenant$Params) => {
        console.log("Requesting tenant with ID:", ID.id);
        this.tenantService.getTenant(ID).subscribe({
          next: (res) => {
            if(res.data?.cin){
              console.log("Tenant ID:", res.data?.cin);
              this.tenantNames.push(res.data?.cin);
            }
          },
          error: (err) => {
            console.error("Error fetching tenant with ID:", ID.id, err);
          }
        });
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onRent() {}

  viewTenant() {
    this.data.tenantId = Number(this.data.tenantId);
  }
}
