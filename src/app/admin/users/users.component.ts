import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/service/crud.service';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';
import { FormControl } from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment} from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userType = 'ryders';
  error = false;
  tableLoader = false;
  page = { length: 0, count: 0 }
  skip = 0;
  control = 1;
  limit = 20;
  userBank = [];
  activeStatus = '';
  params = { title: 'ryders', can_drive: false, role: [1], status: 1 };
  statusFilters: object[] = [
    { title: '', status: 0 },
    { title: 'Verified', status: 1 },
    { title: 'Pending', status: 0 },
    { title: 'Rejected', status: 3 }
  ];
  roleFilters: Object[] = [
    { title: 'ryders', can_drive: false, role: [1] },
    { title: 'titans', can_drive: true, role: [1] },
    { title: 'admins', can_drive: false, role: [2] },
    { title: 'superadmins', can_drive: false, role: [3] }
  ]
  role: boolean;
  searchterm = '';
  count = 0;
  searchDate = ''as any;
  formControl = new FormControl()
  date = new FormControl();
  // date = new FormControl(moment());
  profile = 'Updated Profile Image';
  public displayedColumns = ['index', 'name', 'phone', 'email', 'status'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.util.userList.subscribe(res => {
      if (res) {
        let filter = res.filter(el => {
          return el.can_drive == this.params.can_drive
            && this.params.role.includes(el.role);
        })
        this.dataSource.data = filter as any[];
        this.userBank = res.data;
      }
    })
    this.users();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  async users() {
    try {
      this.tableLoader = true;
      let res: any = await this.crud.getAllRegisteredUser();
      this.util.storeUserList(res.data);
      let filter = res.data.filter(el => {
        return el.can_drive == this.params.can_drive
          && this.params.role.includes(el.role)
        //&& el.status == this.params.status
      })
      let updated = res.data.filter(el => {
        return el.avatar_status == 1;
      })
      console.log(res.data.length)
      console.log('Users found => ', res.data);
      this.count = updated.length;
      //sort the array in descending order;
      res.data.sort((item1, item2) => {
        if(new Date(item2.created_at) > new Date(item1.created_at)){
          return 1;
        }
        else if(new Date(item2.created_at) < new Date(item1.created_at)){
          return -1;
        }
        return 0
      })
      this.dataSource.data = filter as any[];
      this.userBank = res.data;
      this.tableLoader = false;
      this.error = false;
    } catch (err) {
      this.tableLoader = false;
      this.error = true;
    }
  }
  searchName() {
    let filter = this.userBank.filter(el => {
      return el.name.toLowerCase().includes(this.searchterm.toLowerCase())
        && this.params.role.includes(el.role)
    })
    this.dataSource.data = filter as any[];
  }
  async reset() {
    this.searchterm = '';
    this.activeStatus = '';
    this.params = { title: 'ryders', can_drive: false, role: [1], status: 1 };
    this.filterUsers();
  }
  async filterRole() {
    this.searchterm = '';
    //this.params = {...this.params, ...val}
    this.filterUsers();
  }
  async profileChange() {
    this.params = { title: 'Updated Profile Image', can_drive: false, role: [0], status: 0 };
    let filter = this.userBank.filter(el => {
      return el.avatar_status == 1;
    })
    this.dataSource.data = filter as any[];
  }
  async filterStatus(val) {
    this.activeStatus = val.title;
    this.params.status = val.status
    this.filterUsers();
  }
  filterUsers() {
    let filter = this.userBank.filter(el => {
      return el.can_drive == this.params.can_drive
        && this.params.role.includes(el.role) && el.verification_status.includes(this.activeStatus)
      //&& el.status == this.params.status
    })
    this.dataSource.data = filter as any[];
  }
  openUser(user) {
    this.util.setUserInfo(user);
  }
  

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  async resetUserlist(){
    this.searchDate = '';
    this.users()
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
    this.util.storeUserList(filtered)
  }

}
