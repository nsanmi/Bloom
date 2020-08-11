import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { CrudService } from 'src/app/service/crud.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loader = false;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private crud: CrudService,
    private util: UtilService,
    private alert: AlertService
  ) {
    this.loginForm = this.formbuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    if(this.util.isLoggedIn()){
      this.router.navigate(['admin']);
    }
    else{ this.router.navigate(['/']) }
  }

  async login() {
    try {
      this.loader = true;
      let res: any = await this.crud.login(this.loginForm.value);
      this.alert.success('login successful');
      this.util.setToken(res.token);
      this.util.setUserObject(res);
      this.router.navigate(['admin']);
    } catch (err) {
      this.loader = false;
    }
  }

}
