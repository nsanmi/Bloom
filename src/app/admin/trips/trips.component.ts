import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/service/crud.service';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  trip = 'intrastate';
  control = 1
  tableLoader = false;
  trips = [
    {title:'Intrastate Trips', key:'intrastate'},
    {title:'Interstate trips',key:'interstate'},
    {title:'Charter Trips',key:'charter'}
  ]
  statusFilters = [
    'all',
    'completed',
    'accepted',
    'started',
    'pending',
    'cancelled'
  ]
  status = '';
  params = {title:'all',status:''};
  searchterm = "";
  tripBank = [];
  error = false;
  success = false;
  filterBox = false;
  startDate : Date;
  endDate: Date;
  daysParams = 'all';
  days = [
    'all','today', 'week', 'month', 'year'
  ]
  filterOptions = {
    startDate:'' as any,
    endDate:'' as any,
    startDateString:'',
    endDateString:'',
  }
  statusOptions = [
    'all','accepted','started',
    'pending', 'cancelled', 'completed'
  ]
  role:boolean;
  public displayedColumns = ['index', 'destination','pickup','budget','date','status','action'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.util.tripList.subscribe(data=>{
      if(data){
        this.dataSource.data = data as any[];
      }
    })
    this.getTrips(this.trip);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  async getTrips(val) {
    try {
      this.tableLoader = true;
      let res:any;
      this.success = false;
      if(val == 'intrastate'){
        res = await this.crud.getIntraTrips();
      }
      if(val == 'interstate'){
        res = await this.crud.getInterstateTrips();
      }
      if(val == 'charter'){
        res = await this.crud.getChatterTrips();
      }
      this.dataSource.data = res as any[];
      this.tripBank = res;
      this.reset();
      this.util.storeTripList(res);
      this.tableLoader = false;
      this.success = true;
    } catch (err) {
      this.tableLoader = false;
      this.success = false;
    }
  }
  filterTripStatus(val){
    this.params.title = val;
    if(this.params.title == 'all'){
      this.params.status = '';
      this.filter()
    }
    if(this.params.title != 'all'){
      this.params.status = val;
      this.filter()
    }
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
  toggleFilter(){
    this.filterBox = !this.filterBox;
  }
  toogleBody(){
    this.filterBox = false;
  }
  applyFilter(){
    if(this.filterOptions.endDateString == ''
    || this.filterOptions.startDateString == ''){
      this.alert.warning('Please Select a start and end Date')
    }
    else{
      this.filter();
    }
  }
  async filter(){
    if(this.params.title === 'pending'){
      console.log('pending', this.trip)
      try{
        this.tableLoader = true;
      let res:any = [];
        if(this.trip === 'interstate'){
           //get interstate pending trips
           res = await this.crud.getInterstateTripsPending();
        }
        else if(this.trip === 'intrastate'){
          // get intrastate pending trips
          res = await this.crud.getIntraTipsPending();
        }
        console.log('escaped');
        this.dataSource.data = res as any[];
        this.tripBank = res;
        // this.reset();
        this.util.storeTripList(res);
        this.tableLoader = false;
        this.success = true;
        return ;
      }catch(error){
        console.log(error)
        this.tableLoader = false;
        this.success = false;
      }
    }
    this.filterBox = false;
    if(this.filterOptions.startDate == 0 
      || this.filterOptions.endDate == 0){
        let filter = this.tripBank.filter(el=>{
          return  el.trip_status.includes(this.params.title)
        })
        this.dataSource.data = filter as any[];
    }
    else{
      let filteredList = this.tripBank.filter(el => 
        {let time = new Date(el.date).getTime();
        return (this.filterOptions.startDate <= time 
          && time <= this.filterOptions.endDate 
          && el.trip_status.includes(this.params.status))
      });
      this.dataSource.data = filteredList as any[];
    }
  }
  async selectDate(val){
    this.daysParams = val;
    if(val == 'today'){
      this.filterOptions.startDate = await this.util.getYesterdayMidnight();
      this.filterOptions.endDate = await this.util.getTodayMidnight();
      this.filter()
    }
    if(val == 'week'){
      this.filterOptions.startDate = await this.util.getMondayOfCurrentWeek();
      this.filterOptions.endDate = await this.util.getSundayOfCurrentWeek();
      this.filter()
    }
    if(val == 'month'){
      this.filterOptions.startDate = await this.util.getFirstDayOfCurrentMonth();
      this.filterOptions.endDate = await this.util.getLastDayOfCurrentMonth();
      this.filter()
    }
    if(val == 'year'){
      this.filterOptions.startDate = await this.util.getFirstDayOfTheYear();
      this.filterOptions.endDate = await this.util.getLastDayOfTheYear();
      this.filter()
    }
    if(val == 'all'){
      this.filterOptions.startDate = 0;
      this.filterOptions.endDate = 0;
      this.filter();
    }
    
  }
  searchName(){
    this.params = {title:'all',status:''};
    let filter = this.tripBank.filter(el=>{
      return el.pick_up.toLowerCase().includes(this.searchterm.toLowerCase())
      || el.destination.toLowerCase().includes(this.searchterm.toLowerCase())
    })
    this.dataSource.data = filter as any[];
  }
  async reset(){
    this.searchterm = '';
    this.params = {title:'all',status:''};
    this.daysParams = 'all'
    this.filterOptions.startDate = 0;
    this.filterOptions.endDate = 0;
    this.dataSource.data = this.tripBank as any[];
  }
  filterTrips(val){
    this.trip = val;
    this.getTrips(val);
  }
}
