import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {updateProperty} from "../../services/fn/property-controller/update-property";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NewPropertyComponent} from "../new-property/new-property.component";
import {PropertyService} from "../../services/services/propertyService";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = ['address', 'description', 'rentPrice', 'status', 'update', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
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
          this.dataSource.data = response.data.map(property => ({
            address: property.address,
            description: property.description,
            rentPrice: property.rentPrice,
            status: property.status,
          }));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.error('Response data is undefined or null');
        }
      },
      error: (err) => {
        console.error('Error fetching properties', err);
      }
    });
  }

  protected readonly updateProperty = updateProperty;

  UpdateProperty() {

  }

  DeleteProperty() {
  }


  newProperty() {
    this.router.navigateByUrl("/newProperty")
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(NewPropertyComponent, {
      width: '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {

    });

  }
}
