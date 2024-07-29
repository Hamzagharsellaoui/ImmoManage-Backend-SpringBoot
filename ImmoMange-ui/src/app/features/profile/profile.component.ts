import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  imageUrl: string | ArrayBuffer | null = 'assets/default-profile.png';

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private jwtHelper: JwtHelperService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.user = {
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
        joinedDate: decodedToken.joinedDate, // Adjust according to your token structure
      };
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
