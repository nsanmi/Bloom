import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/service/crud.service';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {
  data = {maker:'',model:'',year:'',color:'',seat:'',plate_number:'',id:''};
  loader = false;
  constructor(
    private dialogRef: MatDialogRef<EditVehicleComponent>,
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit() {
    this.data = Object.assign(this.dialogData);
  }
  async submit(){
    try{
      this.loader = true;
      let res:any = await this.crud.updateVehicle(this.data);
      this.alert.success(res.message || `Vehicle Successfully updated`)
      this.dialogRef.close({event:'close', data:res});
      this.loader = false;
    }
    catch(err){
      this.loader = false;
    }
  }
  close() {
    this.dialogRef.close();
  }
}

