import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilService } from 'src/app/service/util.service';
import { AlertService } from 'ngx-alerts';
import { CrudService } from 'src/app/service/crud.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-subscriptions',
  templateUrl: './user-subscriptions.component.html',
  styleUrls: ['./user-subscriptions.component.scss']
})
export class UserSubscriptionsComponent implements OnInit {
  subType = 'all';
  error = false;
  tableLoader = false;
  admin_id = '';
  page = {length:0,count:0}
  skip = 0;
  control = 1;
  limit = 20;
  role:boolean;
  params = {title:'all',is_active:true};
  subBank = [];
  public displayedColumns = [
  'index', 'package', 'amount','payment','created_at',
  'expires_at', 'is_active', 'action'
  ];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private util: UtilService,
    private alert: AlertService,
    private crud: CrudService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.util.subscriptionList.subscribe(data=>{
      if(data){
        this.dataSource.data = data as any[];
        this.subBank = data;
      }
    })
    this.subscriptions();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  async subscriptions() {
    try {
      this.tableLoader = true;
      let sub: any = await this.crud.getAllSubscriptions();
      let packages: any  = await this.crud.getPackages();
      sub.forEach(el => {
        let item = packages.data.filter(e=>{
          return e.id == el.package_id
        })
        item.length > 0?el.package_name = item[0].title:
        el.package_name = 'None'
      });
      this.util.storeSubscriptionList(sub);
      this.dataSource.data = sub as any[];
      this.subBank = sub;
      this.tableLoader = false;
      this.error = false;
    } catch (err) {
      this.error = true;
      this.tableLoader = false;
    }
  }
  filterSub(val){
    this.params.title = val;
    if(this.params.title == 'all'){
      this.dataSource.data = this.subBank as any[];
    }
    if(this.params.title == 'active'){
      this.filter(true)
    }
    if(this.params.title == 'inactive'){
      this.filter(false)
    }
  }
  filter(val){
    let filter = this.subBank.filter(el=>{
      return  el.is_active == val;
    })
    this.dataSource.data = filter as any[];
  }
  delete(item){
    let dialogConfig:any = this.util.dialogConfig();
    let data = {title:`User's ${item.package_name} subscription`,id:item.id,target:'subscription'}
    dialogConfig.data = data;
    dialogConfig.width = '476px';
    let dialogRef = this.matDialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.subscriptions();
      }   
    });
  }
}

