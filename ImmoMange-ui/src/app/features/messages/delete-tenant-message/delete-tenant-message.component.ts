import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TenantService} from "../../../services/services/TenantService";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
;
import {window} from "rxjs";

@Component({
  selector: 'app-delete-tenant-message',
  templateUrl: './delete-tenant-message.component.html',
  styleUrls: ['./delete-tenant-message.component.scss']
})
export class DeleteTenantMessageComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number,cin:string },private router:Router, private tenantService: TenantService) {}


  delete() {
    this.tenantService.deleteTenant({id: this.data.id}).subscribe({
      next: (result) => {
        console.log(result);
      },
      error(err){
        console.log(err.error.error);
      }
    });
  }
  refresh() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
