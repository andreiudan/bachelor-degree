import { Injectable } from '@angular/core';
import { User } from '../../../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = "User/authenticate";
  private loggedInState = new BehaviorSubject<boolean>(false);
  public currentLoggedInState = this.loggedInState.asObservable();

  constructor(private httpClient: HttpClient, private storageService: StorageService) { 
    this.isLoggedIn();
  }

  public login(user: User): Observable<string> {
    const jwtToken = this.httpClient.post(this.loginUrl, user, {responseType: 'text' }).pipe(
      tap((token) => {
        this.storageService.saveJwtToken(token)
        this.changeState(true)
      })
    );

    return jwtToken;
  }

  public logout(): void {
    this.storageService.clean();
    this.changeState(false);
  }

  public isLoggedIn(): boolean {
    const jwtToken = this.storageService.getJwtToken();

    if(jwtToken === null || jwtToken === '') {
      this.changeState(false);
      return false;
    }

    this.changeState(true);
    return true;
  }

  changeState(state: boolean) {
    this.loggedInState.next(state);
  }
}
