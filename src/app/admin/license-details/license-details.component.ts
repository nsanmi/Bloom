import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-license-details',
  templateUrl: './license-details.component.html',
  styleUrls: ['./license-details.component.scss']
})
export class LicenseDetailsComponent implements OnInit {
  loaderVerify = false;
  loaderDecline = false;
  data = {user_id:''};
  constructor(
    private dialogRef: MatDialogRef<LicenseDetailsComponent>,
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
    ) { }

  ngOnInit(): void {
  }
  async confirm(){
    try{
      this.loaderVerify = true;
      this.data.user_id = this.dialogData.user_id;
      let res:any = await this.crud.verifyLicence(this.data);
      this.alert.success(res.message)
      this.dialogRef.close({event:'close', data:res})
      this.loaderVerify = false;
    }
    catch(err){
      this.alert.danger(err.error.message || 'Network error, Unable to processs');
      this.loaderVerify = false;
    }
  }
  async decline() {
    try{
      this.loaderDecline = true
      this.data.user_id = this.dialogData.user_id;
      console.log('am callerd here now: ', this.data)
      let res:any = await this.crud.declineLicence(this.data);
      this.alert.success(res.message)
      this.dialogRef.close({event:'close', data:res})
      this.loaderDecline = false;
    }
    catch(err){
      this.alert.danger(err.error.message || 'Network error, Unable to processs');
      this.loaderDecline = false;
    }
  
  }
  close(){
    this.dialogRef.close();
  }

}
