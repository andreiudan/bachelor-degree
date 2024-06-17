import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { StorageService } from '../../services/storage/storage.service';
import { JwtService } from '../../services/authentication/jwt.service';
import { lastValueFrom } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  public user: User = new User();
  public username: string = '';
  public isPersonal: boolean = true;
  public isSecurity: boolean = false;
  public isPasswordVisible: boolean = false;

  constructor(private storageService: StorageService, private jwtService: JwtService, private userService: UserService) {}

  ngOnInit() {
    Promise.resolve(this.loadUserPersonalInfo());
  }  

  private async loadUserPersonalInfo(): Promise<void> {
    return new Promise<void>(() => {
      const jwtToken = this.storageService.getJwtToken();

      this.user = {
        firstName: this.jwtService.getClaim(jwtToken, 'firstName'),
        lastName: this.jwtService.getClaim(jwtToken, 'lastName'),
        email: this.jwtService.getClaim(jwtToken, 'email'),
        password: ''
      };

      this.username = this.jwtService.getClaim(jwtToken, 'username');
    });
  }

  public onPersonalClick(): void {
    this.isPersonal = true;
    this.isSecurity = false;
  }

  public onSecurityClick(): void {
    this.isPersonal = false;
    this.isSecurity = true;
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
