import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TenantService} from "../../services/services/TenantService";
import {MatDialog} from "@angular/material/dialog";
import {ViewTenantComponent} from "../view-tenant/view-tenant.component";
import {NewTenantComponent} from "../new-tenant/new-tenant.component";
import {UpdateTenantComponent} from "../update-tenant/update-tenant.component";


@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit{
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = ['cin', 'name', 'email', 'phoneNumber','address', 'managerName','update', 'delete','view'];
  private tenants: any[] = [];
  private tenantIdCin:Map<string, number> = new Map();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public tenantService: TenantService,private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.tenantService.getAllTenants().subscribe({
      next: (response) => {
        if (response.data) {
          this.tenants = response.data;
          this.dataSource.data = this.tenants.map(tenant => ({
            cin: tenant.cin,
            name: tenant.name,
            email: tenant.email,
            phoneNumber: tenant.phoneNumber,
            address: tenant.actualPropertyAddress,
            managerName: tenant.managerName
          }));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.tenantIdCin = new Map(
            this.tenants.map(tenant => [tenant.cin, tenant.id])
          );

          console.log('Tenant ID to CIN Map:', this.tenantIdCin);
        } else {
          console.error('Response data is undefined or null');
        }
      },
      error: (err) => {
        console.error('Error fetching Tenants', err);
      }
    });
  }
  DeleteTenant(cin: string) {
    console.log("DeleteTenant", cin);
    let id:number;
    id= this.tenantIdCin.get(cin)!;
    console.log("Tenant ID:", id);

    this.tenantService.deleteTenant({id}).subscribe({
      next: (response) => {
        console.log('Tenant deleted successfully:', response);
        // Optionally, you may want to update your tenant list or refresh the data
      },
      error: (err) => {
        console.error('Error deleting tenant:', err);
      }
    });
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(NewTenantComponent, {
      width: '1000px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openViewDialog(enterAnimationDuration: string, exitAnimationDuration: string, tenantCin: string) {
    const tenant = this.tenants.find(t => t.cin === tenantCin);
    const dialogRef = this.dialog.open(ViewTenantComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { tenant }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
  openUpdateDialog(enterAnimationDuration: string, exitAnimationDuration: string,tenant:any) {
    const dialogRef = this.dialog.open(UpdateTenantComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { tenant }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

}
