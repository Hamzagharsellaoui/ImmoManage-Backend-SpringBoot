import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { PropertyService } from "../../services/services/propertyService";
import { MatDialog } from "@angular/material/dialog";
import { NewPropertyComponent } from "../new-property/new-property.component";
import { ViewPropertieComponent } from "../view-propertie/view-propertie.component";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  public dataSource: MatTableDataSource<any>;
  private properties: any[] = [];
  private propertyAddressIdMap: Map<string, number> = new Map();
  public displayedColumns: string[] = ['address', 'description', 'rentPrice', 'status', 'update', 'delete', 'view'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private propertyService: PropertyService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.getAllProperties();

  }
  public getAllProperties(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (response) => {
        if (response.data) {
          this.properties = response.data;
          this.dataSource.data = this.properties.map(property => ({
            address: property.address,
            description: property.description,
            rentPrice: property.rentPrice,
            status: property.status,
          }));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.propertyAddressIdMap = new Map(
            this.properties.map(property => [property.address, property.id])
          );

          console.log('Property Address to ID Map:', this.propertyAddressIdMap);
        } else {
          console.error('Response data is undefined or null');
        }
      },
      error: (err) => {
        console.error('Error fetching properties', err);
      }
    });
  }
  DeleteProperty(address: string) {
    console.log("DeleteProperty", address);
    let id: number;
    id = this.propertyAddressIdMap.get(address)!;
    console.log("Property ID:", id);

    this.propertyService.deleteProperty({ id }).subscribe({
      next: (response) => {
        console.log('Property deleted successfully:', response);
        this.getAllProperties(); // Refresh the data after deletion
      },
      error: (err) => {
        console.error('Error deleting property:', err);
      }
    });
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(NewPropertyComponent, {
      width: '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProperties();
    });
  }
  openViewDialog(enterAnimationDuration: string, exitAnimationDuration: string, propertyAddress: string) {
    console.log(propertyAddress);
    const property = this.properties.find(p => p.address === propertyAddress);
    const dialogRef = this.dialog.open(ViewPropertieComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { property }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  openUpdateDialog(enterAnimationDuration: string, exitAnimationDuration: string, property: any) {
    // const dialogRef = this.dialog.open(UpdatePropertyComponent, {
    //   width: '800px',
    //   enterAnimationDuration,
    //   exitAnimationDuration,
    //   data: { property }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.getAllProperties(); // Refresh the data after updating a property
    // });
  }
}
