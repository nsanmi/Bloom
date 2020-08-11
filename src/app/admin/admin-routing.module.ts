import { TripsComponent } from './trips/trips.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DocumentsComponent } from './documents/documents.component';
import { NavigationComponent } from './navigation/navigation.component';
import { OtpComponent } from './otp/otp.component';
import { AllPackagesComponent } from './packages/all-packages/all-packages.component';
import { UserSubscriptionsComponent } from './subscriptions/user-subscriptions/user-subscriptions.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

const routes: Routes = [
  {
    path: "",
    component: NavigationComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { title: "Overview | Dashboard" },
      },
      {
        path: "users",
        component: UsersComponent,
        data: { title: "Users | Dashboard" },
      },
      {
        path: "otp",
        component: OtpComponent,
        data: { title: "OTP | Dashboard" },
      },
      {
        path: "trips",
        component: TripsComponent,
        data: { title: "Trips | Dashboard" },
      },
      {
        path: "users/:id",
        component: UserDetailsComponent,
        data: { title: "User details | Dashboard" },
      },
      {
        path: "packages",
        component: AllPackagesComponent,
        data: { title: "Packages | Dashboard" },
      },
      {
        path: "documents",
        component: DocumentsComponent,
        data: { title: "Driver's Documents | Dashboard" },
      },
      {
        path: "vehicles",
        component: VehiclesComponent,
        data: { title: "Vehicles | Dashboard" },
      },
      {
        path: "vehicles/:id",
        component: VehicleDetailsComponent,
        data: { title: "Vehicle details | Dashboard" },
      },
      {
        path: "subscriptions",
        component: UserSubscriptionsComponent,
        data: { title: "User Subscriptions | Dashboard" },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
