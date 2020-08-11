import { CrudService } from 'src/app/service/crud.service';
import { AlertService } from 'ngx-alerts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scaleShowVerticalLines: false,
    scales: {
      xAxes: [{
          gridLines: {
              display:false
          }
      }],

    },
    legend: {
      display: false,
      position: 'bottom',
      label:{
        fontSize: 800,
        fontColor: '#EA9C28'
      },
  }
  }
  reports = {
    chartLabels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept','Oct','Nov','Dec'],
    chartType : 'line',
    chartLegend : true,
    chartData : [
      {data: [100,450,230,290,350,400,0,0,0,0,0,0], label: 'Month', backgroundColor:'transparent'},
      //{data: [], label: 'Other cases', backgroundColor: '#32658B'}
    ]
  }
  dataLoader = false;
  vehicleCount = {
    pending_vehicle: 0,
    total_vehicle: 0,
    user_deleted_vehicle: 0,
    verified_vehicle: 0
  };
  userCount = {
    deactivated_user: 0,
    pending_user: 0,
    total_ryder: 0,
    total_titans: 0,
    verified_titans: 0,
    verified_user: 0
  }
  subCount= {
    active_subscription: 0,
    inactive_subscription: 0,
    total_subscription: 0
  };
  constructor(
    private alert: AlertService,
    private crud: CrudService,
  ) { }

  ngOnInit(): void {
    this.userAnalytics();
    this.vehicleAnalytics()
    this.subAnalytics();
  }
  async userAnalytics() {
    try {
      this.dataLoader = true;
      let uCount: any = await this.crud.getUsersCount();
      this.userCount = {...this.userCount, ...uCount}
      this.dataLoader = false;
    } catch (err) {
      this.dataLoader = false;
    }
  }
  async vehicleAnalytics() {
    try {
      this.dataLoader = true;
      let vehicleCount: any = await this.crud.getVehicleCount();
      this.vehicleCount = vehicleCount;
      this.dataLoader = false;
    } catch (err) {
      this.dataLoader = false;
    }
  }
  async subAnalytics() {
    try {
      this.dataLoader = true;
      let subCount: any = await this.crud.getSubscriptionCount();
      this.subCount = subCount;
      this.dataLoader = false;
    } catch (err) {
      this.dataLoader = false;
    }
  }
}
