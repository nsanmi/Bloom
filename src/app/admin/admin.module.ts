import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { DocumentsComponent } from './documents/documents.component';
import { DriverTripsComponent } from './driver-trips/driver-trips.component';
import { EditVehicleComponent } from './edit-vehicle/edit-vehicle.component';
import { LicenseDetailsComponent } from './license-details/license-details.component';
import { MessageUserDialogComponent } from './message-user-dialog/message-user-dialog.component';
import { NavigationComponent } from './navigation/navigation.component';
import { OtpComponent } from './otp/otp.component';
import { AllPackagesComponent } from './packages/all-packages/all-packages.component';
import { CreatePackageComponent } from './packages/create-package/create-package.component';
import { RydersComponent } from './ryders/ryders.component';
import { SendOtpComponent } from './send-otp/send-otp.component';
import { CreateSubscriptionComponent } from './subscriptions/create-subscription/create-subscription.component';
import { UserSubscriptionsComponent } from './subscriptions/user-subscriptions/user-subscriptions.component';
import { TitansComponent } from './titans/titans.component';
import { TripsComponent } from './trips/trips.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VerifyDialogComponent } from './verify-dialog/verify-dialog.component';
import { VerifyDocumentsComponent } from './verify-documents/verify-documents.component';
import { PendingTripsComponent } from './pending-trips/pendingtrips.component';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatDatepickerModule } from 'saturn-datepicker'

@NgModule({
  declarations: [
    DashboardComponent,
    NavigationComponent,
    TitansComponent,
    RydersComponent,
    UserSubscriptionsComponent,
    CreateSubscriptionComponent,
    CreatePackageComponent,
    AllPackagesComponent,
    VehiclesComponent,
    VehicleDetailsComponent,
    DriverTripsComponent,
    UsersComponent,
    DeleteDialogComponent,
    UserDetailsComponent,
    LicenseDetailsComponent,
    VerifyDialogComponent,
    DocumentDetailsComponent,
    DocumentsComponent,
    VerifyDocumentsComponent,
    MessageUserDialogComponent,
    OtpComponent,
    EditVehicleComponent,
    TripsComponent,
    PendingTripsComponent,
    SendOtpComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatMenuModule,
    MatToolbarModule,
    NgxStarRatingModule,
    MatProgressBarModule,
    MatIconModule,
    ChartsModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    FormsModule, 
    ReactiveFormsModule,
    NgxPaginationModule,
    AdminRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDaterangepickerMd.forRoot(),
    SatDatepickerModule
  ]
})
export class AdminModule { }
