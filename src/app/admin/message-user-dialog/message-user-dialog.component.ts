import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/service/crud.service';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-message-user-dialog',
  templateUrl: './message-user-dialog.component.html',
  styleUrls: ['./message-user-dialog.component.scss']
})
export class MessageUserDialogComponent implements OnInit {
  loader = false;
  data = {text:'',phone:''}
  constructor(
    private dialogRef: MatDialogRef<MessageUserDialogComponent>,
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit() {
    this.data.phone = this.dialogData.phone;
  }
  async submit(){
    try{
      this.loader = true;
      let res:any = await this.crud.sendSmsToUser(this.data);
      this.alert.success(res.message || `Message Successfully Sent`)
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

