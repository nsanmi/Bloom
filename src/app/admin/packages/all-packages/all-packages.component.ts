import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'ngx-alerts';
import { CrudService } from 'src/app/service/crud.service';
import { UtilService } from 'src/app/service/util.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { CreatePackageComponent } from '../create-package/create-package.component';

@Component({
  selector: 'app-all-packages',
  templateUrl: './all-packages.component.html',
  styleUrls: ['./all-packages.component.scss']
})
export class AllPackagesComponent implements OnInit {
  error = false;
  tableLoader = false;
  admin_id = '';
  page = {length:0,count:0}
  skip = 0;
  control = 1;
  limit = 20;
  role:boolean;
  packageBank = [];
  params = {title:'all',status:1};
  public displayedColumns = [
  'index', 'title', 'price','discount','duration','status','action'
  ]
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private util: UtilService,
    private alert: AlertService,
    private matDialog: MatDialog,
    private crud: CrudService
  ) { }

  ngOnInit(): void {
    this.admin_id = this.util.getUserObject().admin_id;
    this.util.packageList.subscribe(data=>{
      if(data){
        this.dataSource.data = data as any[];
        this.packageBank = data;
      }
    })
    this.packages();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  async packages() {
    try {
      this.tableLoader = true;
      let packages: any  = await this.crud.getPackages();
      this.dataSource.data = packages.data as any[];
      this.util.storePackageList(packages.data)
      this.tableLoader = false;
      this.packageBank = packages.data;
      this.error = false;
    } catch (err) {
      this.error = true;
      this.tableLoader = false;
    }
  }
  filterPackages(val){
    this.params.title = val;
    if(this.params.title == 'all'){
      this.dataSource.data = this.packageBank as any[];
    }
    if(this.params.title == 'active'){
      this.filter(1)
    }
    if(this.params.title == 'inactive'){
      this.filter(0)
    }
  }
  filter(val){
    let filter = this.packageBank.filter(el=>{
      return  el.status == val;
    })
    this.dataSource.data = filter as any[];
  }
  newPackage(){
    let dialogConfig:any = this.util.dialogConfig();
    dialogConfig.data = {action:'Create'}
    let dialogRef = this.matDialog.open(CreatePackageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.packages() 
      }   
    });
  }
  editPackage(item){
    let dialogConfig:any = this.util.dialogConfig();
    dialogConfig.data = {action:'Edit',data:item}
    let dialogRef = this.matDialog.open(CreatePackageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.packages() 
      }   
    });
  }
  delete(item){
    let dialogConfig:any = this.util.dialogConfig();
    let data = {title:item.title,id:item.id,target:'package'}
    dialogConfig.data = data;
    dialogConfig.width = '476px';
    let dialogRef = this.matDialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.packages();
      }   
    });
  }
}

