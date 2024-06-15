import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessfulDialogComponent } from '../registration-successful-dialog/registration-successful-dialog.component';
import { PasswordsErrorStateMatcher } from '../../input-validation/error-state-matcher';
import { CustomValidators } from '../../input-validation/custom-validators';
import { INPUT_VALIDATION_RULES } from '../../input-validation/input-validation-rules';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public user = new User();
  public isPasswordVisible: boolean = false;
  public matcher = new PasswordsErrorStateMatcher();

  public constructor(private formBuilder: FormBuilder, private userService: UserService, private dialog: MatDialog, private router: Router){
  }

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          CustomValidators.nameContainsNumbersValidator,
          CustomValidators.nameInvalidCharacterValidator,
          CustomValidators.nameMinimumLengthValidator,
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          CustomValidators.nameContainsNumbersValidator,
          CustomValidators.nameInvalidCharacterValidator,
          CustomValidators.nameMinimumLengthValidator,
        ]
      ],
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
        ],
      ],
      confirmPassword: [
        ''
      ],
    },
    { 
      validator: CustomValidators.matchingPasswordsValidator
    });
  }

  public get firstName(){
    return this.registerForm.get('firstName');
  }

  public get lastName(){
    return this.registerForm.get('lastName');
  }

  public get email(){
    return this.registerForm.get('email');
  }

  public get password(){
    return this.registerForm.get('password');
  }

  public get confirmPassword(){
    return this.registerForm.get('confirmPassword');
  }

  public onSubmit(): void {
    this.register(this.user);
  }

  private register(user: User): void {
    if(this.registerForm.valid){
      let userWithEncodedPassword: User = {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        email: this.email?.value,
        password: btoa(this.password?.value)
      };

      this.userService.register(userWithEncodedPassword).subscribe((response: string) => {
        this.openDialog();
      }, (error) => {
        alert('Registration failed');
        this.ngOnInit();
      });
    }
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationSuccessfulDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/login']);
    })
  }
}
