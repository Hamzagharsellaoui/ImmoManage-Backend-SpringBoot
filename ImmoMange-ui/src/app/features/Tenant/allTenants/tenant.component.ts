import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TenantService} from "../../../services/services/TenantService";
import {MatDialog} from "@angular/material/dialog";
import {ViewTenantComponent} from "../view-tenant/view-tenant.component";
import {NewTenantComponent} from "../new-tenant/new-tenant.component";
import {UpdateTenantComponent} from "../update-tenant/update-tenant.component";
import {UserService} from "../../../services/services/UserService";
import {TokenService} from "../../../services/token/token.service";


@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit{
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = ['cin', 'name', 'email', 'phoneNumber','address','update', 'delete','view'];
  private tenants: any[] = [];
  private tenantIdCin:Map<string, number> = new Map();
  user:any
  errorMessage: Array<string> = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public tenantService: TenantService,
              private dialog: MatDialog,
              private userService:UserService,
              private tokenService: TokenService,) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getAllTenants();
    let id = this.tokenService.getUserIdFromToken();
    if(id){
      this.userService.getUserInfo(id).subscribe({
        next: (res) => {
          if (res.data) {
            this.user=res.data;
            console.log('Current User Info:',this.user);
          } else {
            this.addErrorMessage('User info is undefined.');
          }
        },
      });
    }
  }
  getAllTenants(): void {
    this.tenantService.getAllTenants().subscribe({
      next: (response) => {
        if (response.data)  {
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
        this.getAllTenants();
      },
      error: (err) => {
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
    console.log(tenant)
    const tenantID=this.tenantIdCin.get(tenant.cin)
    console.log("Tenant ID:", tenantID);
    const dialogRef = this.dialog.open(UpdateTenantComponent, {
      width: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { tenant,tenantID,user:this.user }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }
  addErrorMessage(message: string): void {
    if (!this.errorMessage.includes(message)) {
      this.errorMessage.push(message);
    }
  }

}
