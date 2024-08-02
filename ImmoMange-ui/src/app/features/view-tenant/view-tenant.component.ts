import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {PropertyService} from "../../services/services/propertyService";

@Component({
  selector: 'app-view-tenant',
  templateUrl: './view-tenant.component.html',
  styleUrls: ['./view-tenant.component.scss']
})
export class ViewTenantComponent implements OnInit {
  tenant: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewTenantComponent>,
    private propertyService: PropertyService,
  ) {
    this.tenant = data.tenant;
    console.log(this.tenant);

  }
  ngOnInit(): void {

  // this.propertyService.getProperty(this.tenant.propertyIds).subscribe({
  //     next: (res) => {
  //       this.tenant.add(res.data?.address);
  //       console.log(res.data?.address);
  //     }
  //   })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
