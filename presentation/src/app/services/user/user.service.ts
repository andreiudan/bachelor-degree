import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { UserRegistration } from '../../../models/userRegistration';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "User/";

  constructor(private httpClient: HttpClient) { 
  }

  public register(user: UserRegistration) : Observable<string> {
    const registerUrl = this.baseUrl + 'register';

    return this.httpClient.post(registerUrl, user, {responseType: 'text'});
  }

  public getAll(): Observable<any> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  public get(id: string): Observable<any> {
    const getUrl = this.baseUrl + id;

    return this.httpClient.get<User>(getUrl);
  }
}
