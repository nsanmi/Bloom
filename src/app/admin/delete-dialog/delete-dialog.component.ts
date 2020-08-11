import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { CrudService } from 'src/app/service/crud.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  loader = false;
  data = {};
  id = '';
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit() {
    this.id = this.dialogData.id;
  }
  async confirmDelete(){
    try{
      this.loader = true
      let res:any;
      if(this.dialogData.target == 'package'){
        this.data['id'] = this.id
        res = await this.crud.deletePackage(this.data);
      }
      if(this.dialogData.target == 'subscription'){
        this.data['id'] = this.id
        res = await this.crud.deleteUerSubscription(this.data);
      }
      if(this.dialogData.target == 'otp'){
        this.data['id'] = this.id
        res = await this.crud.deleteUserOtp(this.data);
      }
      if(this.dialogData.target == 'admin-access'){
        this.data['user_id'] = this.id
        res = await this.crud.revokeUserAdminAccess(this.data);
      }
      if(this.dialogData.target == 'deactivate-user'){
        this.data['user_id'] = this.id
        res = await this.crud.deactivateUser(this.data);
      }
      if(this.dialogData.target == 'delete-user'){
        this.data['user_id'] = this.id
        res = await this.crud.deleteUserAccount(this.data);
      }
      if(this.dialogData.target == 'vehicle'){
        this.data['id'] = this.id
        res = await this.crud.rejectVehicle(this.data);
      }
      this.alert.success(res.message)
      this.dialogRef.close({event:'close', data:res})
      this.loader = false;
    }
    catch(err){
      this.alert.danger(err.error.message || 'Network error, Unable to processs');
      this.loader = false;
    }
  }
  decline() {
    this.dialogRef.close();
  }
}

