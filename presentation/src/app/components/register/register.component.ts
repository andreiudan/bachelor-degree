import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationSuccessfulDialogComponent } from '../registration-successful-dialog/registration-successful-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public user = new User();

  public constructor(private formBuilder: FormBuilder, private userService: UserService, private dialog: MatDialog){
  }

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [
        ''
      ],
      lastName: [
        ''
      ],
      email: [
        ''
      ],
      password: [
        ''
      ]
    })
  }

  public get firstName(){
    return this.formBuilder.control('firstName');
  }

  public get lastName(){
    return this.formBuilder.control('lastName');
  }

  public get email(){
    return this.formBuilder.control('email');
  }

  public get password(){
    return this.formBuilder.control('password');
  }

  public onSubmit(): void {
    this.register(this.user);
  }

  private register(user: User): void {
    this.userService.register(user).subscribe((response: string) => {
      this.openDialog();
    });
  }

  public setPasswordVisibility(inputName: string): void {
    const input = document.querySelector('input[name="' + inputName + '"]');

    if(input === null){
      return;
    }

    if(input.getAttribute('type') === 'password'){
      input.setAttribute('type', 'text');
    } else {
      input.setAttribute('type', 'password');
    }
  }

  private openDialog(): void {
    this.dialog.open(RegistrationSuccessfulDialogComponent);
  }
}
