import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  ) {
    this.tenant = data.tenant;
    console.log(this.tenant);

  }
  ngOnInit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
