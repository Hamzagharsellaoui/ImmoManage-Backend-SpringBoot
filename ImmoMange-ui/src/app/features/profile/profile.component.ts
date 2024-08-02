import {Component, OnInit, ViewChild} from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';

import {UserService} from "../../services/services/UserService";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {UpdateProfileComponent} from "../update-profile/update-profile.component";

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
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();

  }

  ngOnInit() {
    this.getCurrentUserID();

  }

  getCurrentUserID() {
    const id = this.tokenService.getUserIdFromToken();
    if (id) {
      this.userService.getUserInfo(id).subscribe({
        next: (res) => {
          if (res && res.data) {
            this.user = res.data;
            console.log('Current User Info:', res.data);
          } else {
            this.addErrorMessage('User info is undefined.');
          }
        },
        error: (err) => {
          this.addErrorMessage('Failed to load current user info.');
        }
      });
    } else {
      this.addErrorMessage('No user ID found in token.');
    }
  }

  addErrorMessage(message: string): void {
    if (!this.errorMessage.includes(message)) {
      this.errorMessage.push(message);
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

  openEditProfileDialog(enterAnimationDuration: string, exitAnimationDuration: string,user:any): void {
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
}
