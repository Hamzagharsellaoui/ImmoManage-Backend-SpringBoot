import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TenantService } from '../../../services/services/TenantService';
import { TenantRequestDto } from '../../../services/models/tenant-request-dto';
import { PropertyService } from '../../../services/services/propertyService';
import { Observable, catchError, of } from 'rxjs';
import { AuthenticationService } from '../../../services/services/AuthenticationService';
import { TokenService } from '../../../services/token/token.service';
import { map } from 'rxjs/operators';
import { AddTenantMessageComponent } from '../../messages/add-tenant-message/add-tenant-message.component';
import { MatDialog } from '@angular/material/dialog';
import {UserService} from "../../../services/services/UserService";
import {UserInfoRequest} from "../../../services/models/user-info-request";

@Component({
  selector: 'app-new-tenant',
  templateUrl: './new-tenant.component.html',
  styleUrls: ['./new-tenant.component.scss']
})
export class NewTenantComponent implements OnInit {
  addTenantForm!: FormGroup;
  errorMessage: Array<string> = [];
  availableProperties: Map<number, string> = new Map();
  currentUserId: number = 0;
  selectedPropertyId?: number;

  constructor(
    private fb: FormBuilder,
    private tenantService: TenantService,
    private router: Router,
    private propertyService: PropertyService,
    private tokenService: TokenService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.addTenantForm = this.fb.group({
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      propertyAddress: ['', [Validators.required]]
    });

    this.loadAvailableProperties();
    this.getCurrentUserID().subscribe({
      next: (userId) => {
        this.currentUserId = userId;
      }
    });
  }
  loadAvailableProperties(): void {
    this.propertyService.getAllAvailableProperties().subscribe({
      next: (response) => {
        this.availableProperties = new Map<number, string>(
          Object.entries(response.data).map(([id, address]) => [Number(id), address])
        );
        console.log(this.availableProperties);
      },
      error: (err) => this.addErrorMessage('Failed to load available properties.')
    });
  }
  onAddressSelect(selectedAddress: string): void {
    const propertyId = [...this.availableProperties.entries()]
      .find(([_, address]) => address === selectedAddress)?.[0];
    if (propertyId !== undefined) {
      this.selectedPropertyId = propertyId;
      console.log('Selected Property ID:', this.selectedPropertyId);
    } else {
      this.addErrorMessage('Selected address is not valid.');
    }
  }
  addTenant(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.errorMessage = [];
    if (this.addTenantForm.invalid) {
      this.addTenantForm.markAllAsTouched();
      return;
    }
    const { propertyAddress, ...formValues } = this.addTenantForm.value;
    console.log(this.addTenantForm.value);
    let newTenantRequest: TenantRequestDto = {
      ...formValues,
      managerId: this.currentUserId,
      actualPropertyId: this.selectedPropertyId
    };
    this.tenantService.addTenant({ body: newTenantRequest }).subscribe({
      next: (response) => {
        const message = response.message || 'Tenant added successfully.';
        const dialogRef = this.dialog.open(AddTenantMessageComponent, {
          width: '1000px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: { message }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.router.navigateByUrl('tenant/addTenantMessage');
        });
      },
      error: (err) => {
        let errorMessage = 'An unexpected error occurred.';
        if (err && err.error) {
          if (err.error.message) {
            errorMessage = err.error.message;
          } else if (err.error.validationErrors) {
            errorMessage = err.error.validationErrors.join(', ');
          } else {
            errorMessage = 'Tenant adding failed.';
          }
        }
        const dialogRef = this.dialog.open(AddTenantMessageComponent, {
          width: '1000px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: { message: errorMessage }
        });
        dialogRef.afterClosed().subscribe(result => {
          // Any additional logic after dialog close
        });
      }
    });
  }
  getCurrentUserID(): Observable<number> {
    const id:number | null = this.tokenService.getUserIdFromToken();
    if (id) {
      return this.userService.getUserInfo(id).pipe(
        map(res => {
          if (res && res.data) {
            console.log('Current User Info:', res.data);
            return res.data.id;
          } else {
            this.addErrorMessage('User info is undefined.');
            return 0;
          }
        }),
        catchError(err => {
          this.addErrorMessage('Failed to load current user info.');
          return of(0);
        })
      );
    } else {
      this.addErrorMessage('No user ID found in token.');
      return of(0);
    }
  }
  addErrorMessage(message: string): void {
    if (!this.errorMessage.includes(message)) {
      this.errorMessage.push(message);
    }
  }
}
