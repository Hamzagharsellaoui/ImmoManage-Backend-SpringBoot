import {Component, OnInit, ViewChild} from '@angular/core';
import {Tenant} from "../../services/models/tenant";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TenantService} from "../../services/services/TenantService";

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit{
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = ['cin', 'name', 'email', 'phoneNumber','address'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public tenantService: TenantService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    // this.tenantService.getAllTenants().subscribe({
    //     next:(response)=> {
    //         if(response.data){
    //           this.dataSource.data = response.data.map(Tenant => ({
    //             cin: Tenant.cin,
    //             name: Tenant.name,
    //             email: Tenant.email,
    //             phoneNumber: Tenant.phoneNumber,
    //             address: Tenant.address,
    //           }));
    //           this.dataSource.paginator=this.paginator;
    //           this.dataSource.sort=this.sort;
    //         }
    //         else {
    //           console.error('Response data is undefined or null');
    //         }
    //     },
    //   error: (err) => {
    //     console.error('Error fetching Tenants', err);
    //   }
    //
    // })

  }

}
