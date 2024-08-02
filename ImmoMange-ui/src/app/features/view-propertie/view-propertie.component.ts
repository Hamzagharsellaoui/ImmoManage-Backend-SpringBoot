import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {PropertyService} from "../../services/services/propertyService";

@Component({
  selector: 'app-view-property',
  templateUrl: './view-propertie.component.html',
  styleUrls: ['./view-propertie.component.scss']
})
export class ViewPropertieComponent implements OnInit {
  property: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewPropertieComponent>,
    private propertyService: PropertyService,
  ) {
    this.data = data.property;

  }
  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onRent() {

  }

  viewTenant() {

  }
}
