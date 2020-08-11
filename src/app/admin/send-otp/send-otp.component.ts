import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/service/crud.service';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.scss']
})
export class SendOtpComponent implements OnInit {
  loader = false;
  data = {text:'',phone:''}
  constructor(
    private dialogRef: MatDialogRef<SendOtpComponent>,
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit() {
    console.log('data:',this.dialogData.data);
    
  }
  async confirm(){
    try{
      this.loader = true;
      let res:any = await this.crud.sendSmsToUser(this.dialogData.data);
      this.alert.success(res.message || `Message Successfully Sent`)
      this.dialogRef.close({event:'close', data:res});
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

