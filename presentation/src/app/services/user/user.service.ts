import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "User/";

  constructor(private httpClient: HttpClient) { 
  }

  public register(user: User) : Observable<string> {
    const registerUrl = this.baseUrl + 'register';

    return this.httpClient.post(registerUrl, user, {responseType: 'text'});
  }
}
