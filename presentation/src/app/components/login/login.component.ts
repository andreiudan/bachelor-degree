import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../input-validation/custom-validators';
import { INPUT_VALIDATION_RULES } from '../../input-validation/input-validation-rules';
import { UserAuthentication } from '../../../models/userAuthentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  public loginForm: FormGroup;
  public user = new UserAuthentication();
  public isPasswordVisible: boolean = false;
  public passwordRequirements: string = 
      "Password should contain at least 8 characters.\nPassword should contain at least one uppercase letter, one lowercase letter, one number, and one special character.";

  public constructor(private formBuilder: FormBuilder, 
                     private authService: AuthenticationService,
                     private router: Router) {
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          CustomValidators.emailDomainValidator
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(INPUT_VALIDATION_RULES.password.minLength),
          CustomValidators.passwordStrengthValidator
        ]
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

  private login(user: UserAuthentication){
    if(this.loginForm.valid){
      let userWithEncodedPassword: UserAuthentication = {
        email: this.email?.value,
        password: btoa(this.password?.value),
      };

      this.authService.login(userWithEncodedPassword).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  public checkPasswordInputErrors(): boolean | null {
    return this.password && (this.password.hasError('required') || 
                            this.password.hasError('minlength') || 
                            (this.password.dirty && this.password.hasError('passwordStrength')));
  }

  public checkEmailInputErrors(): boolean | null {
    return this.email && (this.email.hasError('required') || 
                          this.email.hasError('email') || 
                          this.email.hasError('missingDomain'));
  }
}
