import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { LoginComponent } from './features/authentication/login/login.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { BodyComponent } from './body/body.component';
import {MatListModule} from "@angular/material/list";
import {MatLineModule, MatRippleModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TenantComponent } from './features/tenant/tenant.component';
import { PropertyComponent } from './features/property/property.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTooltipModule} from "@angular/material/tooltip";
import { NewPropertyComponent } from './features/new-property/new-property.component';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {AddPropertyMessageComponent} from './features/add-property-message/add-propertie-message.component';
import { UserComponent } from './appUser/user.component';
import {HttpTokenInterceptor} from "./interceptors/app-http.interceptor";
import { ViewPropertieComponent } from './features/view-propertie/view-propertie.component';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import { NewTenantComponent } from './features/new-tenant/new-tenant.component';
import { AddTenantMessageComponent } from './features/add-tenant-message/add-tenant-message.component';
import {MatSelectModule} from "@angular/material/select";
import { ViewTenantComponent } from './features/view-tenant/view-tenant.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { UpdateTenantComponent } from './features/update-tenant/update-tenant.component';
import {MatGridListModule} from "@angular/material/grid-list";



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BodyComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    TenantComponent,
    PropertyComponent,
    NewPropertyComponent,
    AddPropertyMessageComponent,
    UserComponent,
    ViewPropertieComponent,
    NewTenantComponent,
    AddTenantMessageComponent,
    ViewTenantComponent,
    UpdateTenantComponent,

  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatListModule,
        MatRippleModule,
        MatCardModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatInputModule,
        MatDialogModule,
        MatLineModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatGridListModule,
    ],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
