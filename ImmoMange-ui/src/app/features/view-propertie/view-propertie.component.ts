import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view-propertie',
  templateUrl: './view-propertie.component.html',
  styleUrls: ['./view-propertie.component.scss']
})
export class ViewPropertieComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewPropertieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onRent(): void {
    console.log('Rent property:', this.data);
  }

  viewTenant() {
    console.log('Actual Tenant:', this.data);
  }
}
