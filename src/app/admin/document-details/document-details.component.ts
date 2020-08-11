import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {
  loaderVerify = false;
  loaderDecline = false;
  data = {user_id:''};
  constructor(
    private dialogRef: MatDialogRef<DocumentDetailsComponent>,
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
    ) { }

  ngOnInit(): void {
    this.data.user_id = this.dialogData.id;
  }
  async confirm(){
    try{
      this.loaderVerify = true;
      let res:any = await this.crud.verifyUserProfilePicture(this.data);
      this.alert.success(res.message)
      this.dialogRef.close({event:'close', data:res})
      this.loaderVerify = false;
    }
    catch(err){
      this.loaderVerify = false;
    }
  }
  async decline() {
    try{
      this.loaderDecline = true
      let res:any = await this.crud.rejectUserProfilePicture(this.data);
      this.alert.success(res.message)
      this.dialogRef.close({event:'close', data:res})
      this.loaderDecline = false;
    }
    catch(err){
      this.loaderDecline = false;
    }
  
  }
  close(){
    this.dialogRef.close();
  }

}