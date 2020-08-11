import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ryders',
  templateUrl: './ryders.component.html',
  styleUrls: ['./ryders.component.scss']
})
export class RydersComponent implements OnInit {
  ryderType = 'all';
  error = false;
  tableLoader = false;
  data = {length:0,count:0}
  skip = 0;
  control = 1;
  limit = 20;
  role:boolean;
  public displayedColumns = ['index', 'name', 'phone','email', 'status', 'license'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
    let data = [
      {
        name:'Ayo Benjamin',phone:'08033435796',status:'active',
        email:'ayo@gmail.com',license:'AK-00-JL-001'
      },
      {
        name:'Bami Bamidele',phone:'08033435796',status:'deactivated',
        email:'ayomide@gmail.com',license:'AK-00-JL-001'
      },
      {
        name:'Johan Peters',phone:'08033435796',status:'pending',
        email:'clara@gmail.com',license:'AK-00-JL-001'
      },
      {
        name:'Sheriff Adamu',phone:'08033435796',status:'active',
        email:'ayo@gmail.com',license:'AK-00-JL-001'
      },
      {
        name:'Clara Udoka',phone:'08033435796',status:'deactivated',
        email:'clara@gmail.com',license:'AK-00-JL-001'
      },
      {
        name:'Adamu Adamu',phone:'08033435796',status:'deactivated',
        email:'ayo@gmail.com',license:'AK-00-JL-001'
      }
    ]
    this.dataSource.data = data as any[];
  }

}

