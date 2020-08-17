import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/service/crud.service';
import { UtilService } from 'src/app/service/util.service';
import { AlertService } from 'ngx-alerts';
import { FormControl } from '@angular/forms';

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

  daysParams = 'all';
  days = [
    'all','today', 'week', 'month', 'year'
  ]
  // filterBox = true;
  filterBox = false;
  filterOptions = {
    startDate:'' as any,
    endDate:'' as any,
    startDateString:'',
    endDateString:'',
  }
  searchDate= '' as any
  formControl = new FormControl()
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
  getStartDate(event){
    this.daysParams = 'custom';
    this.filterOptions.startDate = new Date(event.value).getTime();
    this.filterOptions.startDateString = new Date(event.value).toLocaleDateString();
  }
  getEndDate(event){
    this.daysParams = 'custom';
    this.filterOptions.endDateString = new Date(event.value).toLocaleDateString();
    this.filterOptions.endDate = new Date(event.value).getTime();
  }
  applyFilter(){
    if(this.filterOptions.endDateString == ''
    || this.filterOptions.startDateString == ''){
      this.alert.warning('Please Select a start and end Date')
    }
    else{
      this.filter(1);
    }
  }

  async resetUserlist(){
    this.searchDate = '';
    this.getVehicles()
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
    this.util.storeSubscriptionList(filtered)
  }
  
}
