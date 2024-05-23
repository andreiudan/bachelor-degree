import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private sprintUrl = 'Sprint/'

  constructor(private http: HttpClient) { }

  public getAll() : Observable<any> {
    return this.http.get(this.sprintUrl);
  }

  public getTasks() : Observable<any> {
    return this.http.get(this.sprintUrl + 'Tasks');
  }
}
