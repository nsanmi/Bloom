import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-verify-dialog',
  templateUrl: './verify-dialog.component.html',
  styleUrls: ['./verify-dialog.component.scss']
})
export class VerifyDialogComponent implements OnInit {
  loader = false;
  data = {};
  id:'';
  constructor(
    private dialogRef: MatDialogRef<VerifyDialogComponent>,
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit() {
    this.id = this.dialogData.id;
  }
  async confirm(){
    try{
      this.loader = true
      let res:any;
      if(this.dialogData.target == 'admin-access'){
        this.data['user_id'] = this.id
        res = await this.crud.grantUserAdminAccess(this.data);
      }
      if(this.dialogData.target == 'verify-user'){
        this.data['user_id'] = this.id
        res = await this.crud.verifyUser(this.data);
      }
      if(this.dialogData.target == 'vehicle'){
        this.data['id'] = this.id
        res = await this.crud.verifyVehicle(this.data);
      }
      this.alert.success(res.message)
      this.dialogRef.close({event:'close', data:res})
      this.loader = false;
    }
    catch(err){
      this.loader = false;
    }
  }
  decline() {
    this.dialogRef.close();
  }
}

