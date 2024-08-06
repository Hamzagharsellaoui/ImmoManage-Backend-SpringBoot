import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-propertie-message',
  templateUrl: './add-propertie-message.component.html',
  styleUrls: ['./add-propertie-message.component.scss']
})
export class AddPropertyMessageComponent{
  constructor(@Inject(MAT_DIALOG_DATA)
              public data: { message: string }
              ,private router:Router) {}

  isSuccessMessage(): boolean {
    return !this.data.message.toLowerCase().includes('property already exists with address:') &&
      !this.data.message.toLowerCase().includes('error');
  }
  refresh() {
    this.router.navigateByUrl("AppUser/property")
  }
}
