import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { UnauthorizedComponent } from './core/unauthorized/unauthorized.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    data: { title: "Login | BloomRydes" },
  },
  {path: '404', component: NotfoundComponent, 
  data: {title: 'Not Found | BloomRydes'}},
  {path: 'unauthorized', component: UnauthorizedComponent, 
  data: {title: 'Unauthorized | BloomRydes'}},
  {
    path: "admin",
    canActivate: [AuthGuard],
    data: {
      title: "BloomRydes - admin dashboard",
      allowedusertypes: ["admin"],
    },
    loadChildren: () =>
      import("./admin/admin.module").then((m) => m.AdminModule),
  },
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
