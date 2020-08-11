import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';
import { MatDialog } from '@angular/material/dialog';
import { VerifyDialogComponent } from '../verify-dialog/verify-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { FormControl } from '@angular/forms';
import { DocumentDetailsComponent } from '../document-details/document-details.component';
import { MessageUserDialogComponent } from '../message-user-dialog/message-user-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user;
  dataLoader = false;
  rating = 0;
  role;
  trips;
  uid = '';
  disabled = true;
  trip:any
  activeTrip = '';
  public displayedColumns = [
    'index', 'package', 'amount','payment','created_at',
    'expires_at', 'is_active',
    ];
    public dataSource = new MatTableDataSource<any>();
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private Activatedroute:ActivatedRoute,
    private crud:CrudService,
    private alert:AlertService,
    private router: Router,
    private util: UtilService,
    private matDialog: MatDialog
    //private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void{
    this.role = this.util.getUserObject().role;
    this.uid = this.Activatedroute.snapshot.paramMap.get("id"); 
    this.userDetails();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  async userDetails() {
    try {
      this.dataLoader = true;
      let res: any = await this.crud.getSingleUserDetails(this.uid);
      this.user = res.data;
      this.trip = res.data.active_Intra_Trip;
      this.activeTrip = 'intra';
      let star = (parseInt(res.data.rating) / 100) * 5;
      star > 0 && star < 1?this.rating = 1:this.rating = Math.round(star);
      if(res.data.role == 1 && res.data.can_drive == true){
        let sub: any = await this.crud.getAllUserPreviousAndCurrentSubscription({user_id:this.uid});
        this.dataSource.data = sub as any[];
        this.trip = res.data.active_Driver_Intra_Trip;
        this.activeTrip = 'driver-intra'
      }
      this.dataLoader = false;
    } catch (err) {
      this.dataLoader = false;
    }
  }
  toggleTrip(data){
    this.trip = data; 
  }
  message(){
    let dialogConfig:any = this.util.dialogConfig();
    dialogConfig.data = {phone:this.user.phone,id:this.user.id};
    dialogConfig.width = '576px';
    let dialogRef = this.matDialog.open(MessageUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userDetails();
      }   
    });
  }
  grantAdminAccess(){
    let data = {
      title: this.user.name,id:this.user.id,
      target:'admin-access', action: 'Grant Admin Access to'
    }
    this.acceptFunctions(data);
  }
  verifyImage(){
    let data = {
      title: this.user.name,id:this.user.id,
      avatar: this.user.avatar,
      update_avatar: this.user.update_avatar,
      target:'verify-image', action: 'verify'
    }
    this.profileImageFunctions(data);
  }
  RejectImage(){
    let data = {
      title: this.user.name,id:this.user.id,
      avatar: this.user.avatar,
      update_avatar: this.user.update_avatar,
      target:'verify-image', action: 'reject'
    }
    this.profileImageFunctions(data);
  }
  verifyUser(){
    let data = {
      title: this.user.name,id:this.user.id,
      target:'verify-user', action: 'Verify'
    }
    this.acceptFunctions(data);
  }
  revokeAdminAccess(){
    let data = {
      title: this.user.name,id:this.user.id,
      target:'admin-access', action: 'Revoke Admin Access from'
    }
    this.declineFunctions(data);
  }
  decativateUser(){
    let data = {
      title: this.user.name,id:this.user.id,
      target:'deactivate-user', action: 'Deactivate'
    }
    this.declineFunctions(data);
  }
  deleteUser(){
    let data = {
      title: this.user.name,id:this.user.id,
      target:'delete-user', action: 'Delete'
    }
    let dialogConfig:any = this.util.dialogConfig();
    dialogConfig.data = data;
    dialogConfig.width = '476px';
    let dialogRef = this.matDialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['admin/users'])
      }   
    });
  }
  declineFunctions(data){
    let dialogConfig:any = this.util.dialogConfig();
    dialogConfig.data = data;
    dialogConfig.width = '476px';
    let dialogRef = this.matDialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userDetails();
      }   
    });
  }
  acceptFunctions(data){
    let dialogConfig:any = this.util.dialogConfig();
    dialogConfig.data = data;
    dialogConfig.width = '476px';
    let dialogRef = this.matDialog.open(VerifyDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userDetails();
      }   
    });
  }
  profileImageFunctions(data){
    let dialogConfig:any = this.util.dialogConfig();
    dialogConfig.data = data;
    dialogConfig.width = '576px';
    let dialogRef = this.matDialog.open(DocumentDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.userDetails();
      }   
    });
  }
}

