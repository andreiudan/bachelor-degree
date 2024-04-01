import { Injectable } from '@angular/core';
import { User } from '../../../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = "User/authenticate";

  constructor(private httpClient: HttpClient) { }

  public login(user: User): Observable<string> {
    return this.httpClient.post(this.loginUrl, user, {responseType: 'text' }
    )
  }
}
