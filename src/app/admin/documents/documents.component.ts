import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { UtilService } from 'src/app/service/util.service';
import { AlertService } from 'ngx-alerts';
import { VehicleDetailsComponent } from '../vehicle-details/vehicle-details.component';
import { MatDialog } from '@angular/material/dialog';
import { LicenseDetailsComponent } from '../license-details/license-details.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  admin_id;
  dataLoader = false;
  p: number = 1;
  error = false;
  licenses = [ ];
  licenseBank = [];
  searchterm = '';
  params = {title:'All'};
  constructor(
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.admin_id = this.util.getUserObject().admin_id;
    this.util.tripList.subscribe(data=>{
      if(data){
        this.licenses = data;
        this.licenseBank = data;
      }
    })
    this.getLicences();
  }
  async getLicences() {
    try {
      this.dataLoader = true;
      let data = {admin_id: this.admin_id}
      let res: any = await this.crud.getLicenses(data);
      this.util.storeDocList(res);
      this.licenses = res;
      this.licenseBank = res;
      this.dataLoader = false;
      this.error = false;
    } catch (err) {
      this.dataLoader = false;
      this.error = true;
    }
  }
  searchName(){
    let filter = this.licenseBank.filter(el=>{
      return el.driver_name.toLowerCase().includes(this.searchterm.toLowerCase())
    })
    this.licenses = filter
  }
 async reset(){
    this.searchterm = '';
    this.params = {title:'All',};
    this.filterLicense('');
  }
  filterLicense(val){
    this.params.title = val;
    if(val == 'All'){
      this.licenses = this.licenseBank;
    }
    if(val !== 'All'){
      this.filter(val)
    }
  }
  filter(val){
    let filter = this.licenseBank.filter(el=>{
      return  el.status == val;
    })
    this.licenses = filter;
  }
  view(item){
    let dialogConfig:any = this.util.dialogConfig();
    let data = item;
    dialogConfig.data = data;
    let dialogRef = this.matDialog.open(LicenseDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getLicences();
      }   
    });
  }
}
