import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';
import { VerifyDialogComponent } from '../verify-dialog/verify-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditVehicleComponent } from '../edit-vehicle/edit-vehicle.component';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle;
  dataLoader = false;
  data = {
    vid:'',admin_id:''
  }
  constructor(
    private Activatedroute:ActivatedRoute,
    private crud:CrudService,
    private alert:AlertService,
    private router: Router,
    private util: UtilService,
    private matDialog: MatDialog
    //private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void{
    this.data.admin_id = this.util.getUserObject().admin_id;
    this.data.vid = this.Activatedroute.snapshot.paramMap.get("id"); 
    this.vehicleDetails();
  }
  async vehicleDetails() {
    try {
      this.dataLoader = true;
      let res: any = await this.crud.getVehicleDetails(this.data);
      this.vehicle = res.data;
      this.dataLoader = false;
    } catch (err) {
      this.dataLoader = false;
    }
  }
  verify(){
    let dialogConfig:any = this.util.dialogConfig();
    let data = {
      title:`${this.vehicle.maker} ${this.vehicle.model}`,
      id:this.vehicle.id,target:'vehicle', action: 'Verify'
    }
    dialogConfig.data = data;
    dialogConfig.width = '476px';
    let dialogRef = this.matDialog.open(VerifyDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.vehicleDetails();
      }   
    });
  }
  reject(){
    let dialogConfig:any = this.util.dialogConfig();
    let data = {
      title:`${this.vehicle.maker} ${this.vehicle.model}`,
      id:this.vehicle.id,target:'vehicle', action: 'Reject'
    }
    dialogConfig.data = data;
    dialogConfig.width = '476px';
    let dialogRef = this.matDialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.vehicleDetails();
      }   
    });
  }
  update(){
    let dialogConfig:any = this.util.dialogConfig();
    let data = this.vehicle;
    dialogConfig.data = data;
    dialogConfig.width = '576px';
    let dialogRef = this.matDialog.open(EditVehicleComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.vehicleDetails();
      }   
    });
  }
}
