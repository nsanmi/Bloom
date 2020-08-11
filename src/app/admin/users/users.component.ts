import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/service/crud.service';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';

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
      this.count = updated.length;
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
}
