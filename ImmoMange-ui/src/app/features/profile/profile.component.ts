// profile.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/services/UserService";
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public dataSource: MatTableDataSource<any>;
  user: any;
  errorMessage: Array<string> = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private tokenService: TokenService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
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

  formatName(fullName: string | null): string {
    if (!fullName) {
      return '';
    }
    const parts = fullName.split(' ');
    if (parts.length < 2) {
      return fullName;
    }
    return `${parts[0]} ${parts[1]}`;
  }
  openEditProfileDialog(enterAnimationDuration: string, exitAnimationDuration: string, user: any): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      width: '800px',
      data: {
        name: this.user.name,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        profileImage: this.user.profileImage
      }
    });
  }
  addErrorMessage(message: string): void {
    if (!this.errorMessage.includes(message)) {
      this.errorMessage.push(message);
    }
  }
}
