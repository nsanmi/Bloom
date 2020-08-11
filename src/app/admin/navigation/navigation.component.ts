import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UtilService } from 'src/app/service/util.service';
import { CrudService } from 'src/app/service/crud.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  name = '';
  logoUrl = '';
  user: any;
  mode = 'over'
  opened = true;
  changeMenu = false;
  layoutGap = '64';
  fixedInViewport = false;
  adminMenu = [
    { path: 'dashboard', icon: 'dashboard', title: 'Dashboard' },
    { path: 'users', icon: 'supervised_user_circle', title: 'Users' },
    { path: 'subscriptions', icon: 'card_membership', title: 'User Subscriptions' },
    { path: 'vehicles', icon: 'local_taxi', title: 'Vehicles' },
    { path: 'trips', icon: 'edit_road', title: 'Trips' },
    { path: 'pendingtrips', icon: 'edit_road', title: 'Pending-Trips' },
    { path: 'documents', icon: 'description', title: 'Drivers Documents' },
    { path: 'otp', icon: 'vpn_key', title: 'OTP Verifications' },
    { path: 'packages', icon: 'card_travel', title: 'Packages' },
  ]
  constructor(
    private bpo: BreakpointObserver,
    private router: Router,
    private util: UtilService,
    private crud: CrudService,
  ) { }

  ngOnInit() {
    // setTimeout(() =>
    //   $('.noty').toggleClass('toggle-Open'), 5000
    // );
    this.slide();
    this.user = this.util.getUserObject();
    const breakpoints = Object.keys(Breakpoints).map(key => Breakpoints[key])
    this.bpo.observe(breakpoints)
      .pipe(map(bst => bst.matches))
      .subscribe(matched => {
        this.determineSidenavMode();
        this.determineLayoutGap();
      });

  }

  private determineSidenavMode(): void {
    if (
      this.isExtraSmallDevice() ||
      this.isSmallDevice()
    ) {
      this.fixedInViewport = false;
      this.mode = 'over';
      this.changeMenu = true;
      this.opened = false;
      return;
    }

    this.fixedInViewport = true;
    this.mode = 'side';
    this.changeMenu = false;
  }

  private determineLayoutGap(): void {
    if (this.isExtraSmallDevice() || this.isSmallDevice()) {
      this.layoutGap = '0';
      return;
    }

    this.layoutGap = '64';
  }

  public isExtraSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.XSmall);
  }

  public isSmallDevice(): boolean {
    return this.bpo.isMatched(Breakpoints.Small)
  }

  async logout() {
    this.util.logout();
  }
  slide() {
    $(document).ready(() => {
      $('#slider-button').click(() => {
        $('.noty').toggleClass('toggle-Open');
      });
    });
  }
}
