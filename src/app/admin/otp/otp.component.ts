import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/service/crud.service';
import { UtilService } from 'src/app/service/util.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SendOtpComponent } from '../send-otp/send-otp.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  error = false;
  tableLoader = false;
  admin_id = '';
  page = {length:0,count:0}
  skip = 0;
  control = 1;
  limit = 20;
  role:boolean;
  searchterm = '';
  otpBank = [];
  packageBank = [];
  data = {admin_id:''};
  params = {title:'All'};
  status = 'All';
  searchDate = '' as any;
  formControl = new FormControl();
  public displayedColumns = [
  'index', 'otp', 'phone','date','status','action'
  ]
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private util: UtilService,
    private matDialog: MatDialog,
    private crud: CrudService
  ) { }

  ngOnInit(): void {
    this.util.otpList.subscribe(data=>{
      if(data){
        this.dataSource.data = data as any[];
        this.otpBank = data;
      }
    })
    this.otp();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  searchOTP(){
    let filter = this.otpBank.filter(el=>{
      return el.phone.toLowerCase().includes(this.searchterm.toLowerCase())
    })
    this.dataSource.data = filter as any[];
  }
  async reset(){
    this.searchterm = '';
    this.dataSource.data = this.otpBank as any[];
  }
  filterOTP(val){
    if(val == 'All'){
      this.dataSource.data = this.otpBank as any[];
    }
    if(val !== 'All'){
      this.filter(val)
    }
  }
  filter(val){
    let filter = this.otpBank.filter(el=>{
      return  el.status == val;
    })
    this.dataSource.data = filter as any[];
  }
  async otp() {
    try {
      this.tableLoader = true;
      let otp: any  = await this.crud.getAllOtpSent();
      this.dataSource.data = otp.data as any[];
      this.otpBank = otp.data;
      this.util.storeOTPList(otp.data);
      this.tableLoader = false;
      this.error = false;
    } catch (err) {
      this.error = true;
      this.tableLoader = false;
    }
  }

  delete(item){
    let dialogConfig:any = this.util.dialogConfig();
    let data = {title:`User OTP - ${item.otp}`,id:item.id,target:'otp'}
    dialogConfig.data = data;
    dialogConfig.width = '476px';
    let dialogRef = this.matDialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.otp();
      }   
    });
  }
  resend(item){
    let dialogConfig:any = this.util.dialogConfig();
    dialogConfig.data = {
      data:{phone:item.phone,text:item.otp}
    };
    dialogConfig.width = '476px';
    let dialogRef = this.matDialog.open(SendOtpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  async resetUserlist(){
    this.searchDate = '';
    this.otp()
    // await this.subscriptions()

    // this.filterSub(this.params.title)
  }
  dateRangeSelected(){
    // console.log('called here now')
    // console.log(this.searchDate)
    // console.log(this.searchDate.start.toDate())
    const startDate = new Date(this.searchDate.start.toDate())
    const endDate = new Date(this.searchDate.end.toDate())
    const users: any[] = this.dataSource.data;
    const filtered: any[] = users.filter((item) => {
      if(new Date(item.created_at) >= startDate && new Date(item.created_at) <= endDate){
        return true;
      }
      return false;
    })
    this.dataSource.data = filtered;
    this.util.storeOTPList(filtered)
  }
}


