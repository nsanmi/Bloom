import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
  constructor(
    private router: Router,
    private util: UtilService
  ) { }

  ngOnInit() {
  }
  dashboard(){
    if(this.util.isLoggedIn()){
      this.router.navigate(['admin']);
    }
    else{
    return this.router.navigate(['/']);
    }
  }
}

