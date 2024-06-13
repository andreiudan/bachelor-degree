import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(MatSidenav)
  public sidenav!: MatSidenav;
  public title = 'presentation';
  public isSidenavCollapsed = true;
  public isLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.currentLoggedInState.subscribe((loggedInState) => {
      this.isLoggedIn = loggedInState;
      this.setFirstPage();
    });
  }

  private async setFirstPage() {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationStart){
        if(val.url == '/' || val.url == ''){
          if(this.isLoggedIn){
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/landing']);
          }
        }
      }
    });
  }

  public toggleSidenav(): void {
    this.sidenav.open();
    this.isSidenavCollapsed = !this.isSidenavCollapsed;
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
