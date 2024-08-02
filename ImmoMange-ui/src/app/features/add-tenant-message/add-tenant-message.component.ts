import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router} from "@angular/router";
@Component({
  selector: 'app-add-tenant-message',
  templateUrl: './add-tenant-message.component.html',
  styleUrls: ['./add-tenant-message.component.scss']
})
export class AddTenantMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },private router:Router) {}

  ngOnInit(): void {
  }


  isSuccessMessage(): boolean {
    return !this.data.message.toLowerCase().includes('tenant already exists with cin:') &&
      !this.data.message.toLowerCase().includes('error');
  }

  refresh() {
    this.router.navigateByUrl("AppUser/tenant")
  }
}
