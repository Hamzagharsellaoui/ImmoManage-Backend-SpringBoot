import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-property-message',
  templateUrl: './delete-property-message.component.html',
  styleUrls: ['./delete-property-message.component.scss']
})
export class DeletePropertyMessageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },private router:Router) {}

  ngOnInit(): void {
  }


  refresh() {
    this.router.navigateByUrl("AppUser/tenant")
  }
}
