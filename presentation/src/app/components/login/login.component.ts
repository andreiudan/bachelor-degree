import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  public loginForm: FormGroup;
  public user = new User();

  public constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) {
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
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('jwtToken', token);
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
