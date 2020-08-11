import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/service/crud.service';
import { UtilService } from 'src/app/service/util.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicleType = 'all';
  error = false;
  tableLoader = false;
  data = {length:0,count:0}
  skip = 0;
  vehicleBank = [];
  control = 1;
  limit = 20;
  role:boolean;
  searchterm = '';
  admin_id = '';
  params = {title:'All',status:-1};
  statusFilters : object[] = [
    {title:'All',status:-1},
    {title:'Verified',status:1},
    {title:'Pending',status:0},
    {title:'Rejected',status:3}
  ];
  public displayedColumns = [
    'index', 'maker', 'model','year', 'color', 
    'seat','status'
  ];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService,
  ) { }

  ngOnInit(): void {
    this.admin_id = this.util.getUserObject().admin_id;
    this.util.vehicleList.subscribe(data=>{
      if(data){
        this.dataSource.data = data as any[];
      }
    })
    this.getVehicles();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  async getVehicles() {
    try {
      this.tableLoader = true;
      let data = {admin_id: this.admin_id}
      let res: any = await this.crud.getVehicles(data);
      this.util.storeVehicleList(res);
      this.dataSource.data = res as any[];
      this.vehicleBank = res;
      this.tableLoader = false;
    } catch (err) {
      this.tableLoader = false;
    }
  }
    searchName(){
    let filter = this.vehicleBank.filter(el=>{
      return el.driver_name.toLowerCase().includes(this.searchterm.toLowerCase())
      || el.plate_number.toLowerCase().includes(this.searchterm.toLowerCase())
    })
    this.dataSource.data = filter as any[];
  }
 async reset(){
    this.searchterm = '';
    this.params = {title:'All',status:-1};
    this.dataSource.data = this.vehicleBank as any[];
  }
  setVehicle(data){
    this.util.setVehicleInfo(data);
  }
  filterVehicle(val){
    this.params = val;
    if(val.status == -1){
      this.dataSource.data = this.vehicleBank as any[];
    }
    if(val.status !== -1){
      this.filter(val)
    }
  }
  filter(val){
    let filter = this.vehicleBank.filter(el=>{
      return  el.status == val.status;
    })
    this.dataSource.data = filter as any[];
  }
}
