import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

const TOKEN_KEY = 'jwtToken';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
   }

  public clean(): void {
    if(this.isBrowser){
      window.sessionStorage.clear();
    }
  }

  public saveJwtToken(token: string): void {
    if(this.isBrowser){
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  public getJwtToken(): string {
    if(!this.isBrowser){
      return '';
    }

    return sessionStorage.getItem(TOKEN_KEY) ?? '';
  } 
}
