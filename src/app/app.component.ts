import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Event as RouterEvent } from "@angular/router";
import { RouteConfigLoadEnd } from "@angular/router";
import { RouteConfigLoadStart } from "@angular/router";
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isShowingRouteLoadIndicator: boolean;
  constructor(
    private titleService: Title,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    ) {
      this.isShowingRouteLoadIndicator = false;
        var asyncLoadCount = 0;
        router.events.subscribe(
            ( event: RouterEvent ) : void => {
 
                if ( event instanceof RouteConfigLoadStart ) {
 
                    asyncLoadCount++;

                } else if ( event instanceof RouteConfigLoadEnd ) {
 
                    asyncLoadCount--;
 
                }
                this.isShowingRouteLoadIndicator = !! asyncLoadCount;
            }
        );
    }

    ngOnInit() {
      const appTitle = this.titleService.getTitle();
      this.router
        .events.pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => {
            const child = this.activatedRoute.firstChild;
            if (child.snapshot.data['title']) {
              return child.snapshot.data['title'];
            }
            return appTitle;
          })
        ).subscribe((ttl: string) => {
          this.titleService.setTitle(ttl);
        });
      }
}
