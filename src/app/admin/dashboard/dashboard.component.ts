import { UtilService } from 'src/app/service/util.service';
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
    chartLabels : ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sat'],
    chartType : 'line',
    chartLegend : true,
    chartData : [
      {data: [], label: 'Ryders', borderColor: '#36A2EB', backgroundColor:'transparent'},
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
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.userAnalytics();
    this.vehicleAnalytics()
    this.subAnalytics();
    this.util.userList.subscribe(res=>{
      if(res){
        this.getGraphData(res)
      }
      else{
        this.users();
      }
    })
  }
  async userAnalytics() {
    try {
      console.log('called here now')
      this.dataLoader = true;
      let uCount: any = await this.crud.getUsersCount();
      console.log('users count', uCount)
      this.userCount = {...this.userCount, ...uCount}
      this.dataLoader = false;
    } catch (err) {
      console.log(err)
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
  async users() {
    try {
      this.dataLoader = true;
      let res: any = await this.crud.getAllRegisteredUser();
      this.util.storeUserList(res.data);
    } catch (err) {
      this.dataLoader = false;
    }
  }
  async getGraphData(res){
    let dates = await this.util.getAllDatesOfCurrentWeek();
    dates.forEach(element => {
      let stats = res.filter(d => 
        {let time = new Date(d.created_at).getTime();
          return (element.start <= time && time <= element.end);
      })
      this.reports.chartData[0].data.push(stats.length);
    });
  }
}
