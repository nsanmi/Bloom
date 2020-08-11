import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from 'src/app/service/crud.service';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-titans',
  templateUrl: './titans.component.html',
  styleUrls: ['./titans.component.scss']
})
export class TitansComponent implements OnInit {
  titanType = 'all';
  error = false;
  tableLoader = false;
  data = {length:0,count:0}
  skip = 0;
  control = 1;
  limit = 20;
  admin_id = ''
  role:boolean;
  public displayedColumns = ['index', 'name', 'phone','email', 'status', 'license'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.users();
  }
  async users() {
    try {
      this.tableLoader = true;
      let sub: any = await this.crud.getAllRegisteredUser();
      this.dataSource.data = sub as any[];
      this.tableLoader = false;
    } catch (err) {
      this.tableLoader = false;
    }
  }
}
