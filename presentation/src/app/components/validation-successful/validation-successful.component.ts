import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation-successful',
  standalone: true,
  imports: [MatButton],
  templateUrl: './validation-successful.component.html',
  styleUrl: './validation-successful.component.scss'
})
export class ValidationSuccessfulComponent {

  constructor(private router: Router) { }

  public navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
