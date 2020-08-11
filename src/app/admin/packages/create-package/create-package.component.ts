import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/service/crud.service';
import { AlertService } from 'ngx-alerts';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.scss']
})
export class CreatePackageComponent implements OnInit {
  data = {duration:'',price:'',title:'',discount:'',admin_id:''};
  loader = false;
  constructor(
    private dialogRef: MatDialogRef<CreatePackageComponent>,
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit() {
    if(this.dialogData.data){
      this.data = Object.assign(this.dialogData.data);
      
    }
    this.data.admin_id = this.util.getUserObject().admin_id;
  }
  async createPackge(){
    try{
      this.loader = true;
      let res:any;
      this.dialogData.action == "Edit"?
      res = await this.crud.updatePackage(this.data):
      res = await this.crud.createPackage(this.data);
      this.alert.success(res.message || `Package Successfully ${this.dialogData.action}ed`)
      this.dialogRef.close({event:'close', data:res[0]});
      this.loader = false;
    }
    catch(err){
      this.alert.danger(err.error.message || 'Network error, Unable to processs');
      this.loader = false;
    }
  }
  close() {
    this.dialogRef.close();
  }
}
