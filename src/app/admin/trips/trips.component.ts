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
  trip = 'intra';
  control = 1
  tableLoader = false;
  trips = [
    { title: 'Intrastate Trips', key: 'intra' },
    { title: 'Interstate trips', key: 'inter' },
    { title: 'Charter Trips', key: 'charter' }
  ]
  statusFilters = [
    'all',
    'completed',
    'accepted',
    'started',
    'pending',
    'cancelled'
  ]
  status = ''
  success = false;
  role: boolean;
  public displayedColumns = ['index', 'destination', 'pickup', 'budget', 'date', 'status', 'action'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.util.tripList.subscribe(data => {
      if (data) {
        this.dataSource.data = data as any[];
      }
    })
    this.users(this.trip);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  async users(val) {
    try {
      this.tableLoader = true;
      let res: any;
      this.success = false;
      if (val == 'intra') {
        res = await this.crud.getIntraTrips();
      }
      if (val == 'inter') {
        res = await this.crud.getInterstateTrips();
      }
      if (val == 'charter') {
        res = await this.crud.getChatterTrips();
      }
      if (val == 'pending') {
        res = await this.crud.getPendingIntraTrips();
      }
      if (val == 'pendingin') {
        res = await this.crud.getPendingInterTrips();
      }
      this.dataSource.data = res as any[];
      this.util.storeTripList(res);
      this.tableLoader = false;
      this.success = true;
    } catch (err) {
      this.tableLoader = false;
      this.success = false;
    }
  }
  filterTripStatus(val) {

  }
  filterTrips(val) {
    this.trip = val;
    this.users(val);
  }
}
