import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registerUrl = "User/register";

  constructor(private httpClient: HttpClient) { 
  }

  public register(user: User) : Observable<string> {
    return this.httpClient.post(this.registerUrl, user, {responseType: 'text'});
  }
}
