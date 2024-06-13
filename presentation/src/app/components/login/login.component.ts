import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  public loginForm: FormGroup;
  public user = new User();

  public constructor(private formBuilder: FormBuilder, 
                     private authService: AuthenticationService,
                     private router: Router) {
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
      ],
      password: [
        '',
      ],
    })
  }

  public onSubmit(){
    this.login(this.user);
  }

  public get email(){
    return this.loginForm.get('email');
  }

  public get password(){
    return this.loginForm.get('password');
  }

  private login(user: User){
    this.authService.login(user).subscribe(() => {
      this.router.navigate(['/dashboard']);
    }, (error) => {
      alert('Login failed');
      this.ngOnInit();
    });
  }

  public setPasswordVisibility(): void {
    const input = document.querySelector('input[name="password"]');

    if(input === null){
      return;
    }

    if(input.getAttribute('type') === 'password'){
      input.setAttribute('type', 'text');
    } else {
      input.setAttribute('type', 'password');
    }
  }
}
