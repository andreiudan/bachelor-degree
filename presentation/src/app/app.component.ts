import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  title = 'presentation';
  isSidenavCollapsed = true;
  isLoggedIn = true;

  constructor(private router: Router) {
    // if (!this.isLoggedIn) {
    //   this.router.navigate(['/login']);
    // }
    // else {
    //   this.router.navigate(['/landing']);
    // }
  }

  public toggleSidenav(): void {
    this.sidenav.open();
    this.isSidenavCollapsed = !this.isSidenavCollapsed;
  }
}
