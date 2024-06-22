import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Timesheet } from '../../../models/timesheet';
import { TimesheetCreation } from '../../../models/timesheetCreation';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private baseUrl = 'Timesheet';

  constructor(private httpClient: HttpClient) { }

  public getAllByUserId(userId: string) {
    const getAllByUserIdUrl = this.baseUrl + 'userId=' + userId;

    return this.httpClient.get<Timesheet[]>(getAllByUserIdUrl).pipe(
      map((timesheets) => timesheets.map((timesheet) => ({
        ...timesheet,
        date: new Date(timesheet.date)
      })))
    );
  }

  public create(timesheet: TimesheetCreation) {
    return this.httpClient.post(this.baseUrl, timesheet, { responseType: 'text' });
  }

  public update(timesheet: Timesheet) {
    return this.httpClient.put(this.baseUrl, timesheet, { responseType: 'text' });
  }

  public delete(id: string) {
    const deleteUrl = this.baseUrl + '/' + id;

    return this.httpClient.delete(deleteUrl, { responseType: 'text' });
  }

  public getAllForUserByDateInterval(startDate: string, endDate: string){
    const getAllForUserByDateIntervalUrl = this.baseUrl + `/startDate=${startDate}&endDate=${endDate}`;

    return this.httpClient.get<Timesheet[]>(getAllForUserByDateIntervalUrl);
  }
}
