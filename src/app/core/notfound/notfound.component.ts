import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {
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

