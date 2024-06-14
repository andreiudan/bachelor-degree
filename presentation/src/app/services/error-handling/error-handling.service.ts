import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService extends ErrorHandler {

  constructor(private zone: NgZone, private router: Router, private authService: AuthenticationService) { 
    super();
  }

  override handleError(error: Error | HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred. Please try again later.';

    if (error instanceof HttpErrorResponse) {
      switch(error.status) {
        case 0:
          errorMessage = "Communication Error: The server may be down or there could be a network issue.";
          this.authService.logout();
          this.router.navigate(['/landing']);
          break;
        case 400:
          errorMessage = 'Bad Request: The server could not understand the request due to invalid syntax.';
          break;
        case 401:
          errorMessage = 'Unauthorized: You are not authorized to access this resource.';
          this.authService.logout();
          this.router.navigate(['/login']);
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource could not be found.';
          break;
        case 500:
          errorMessage = 'Internal Server Error: An error occurred on the server. Please try again later.';
          break;
        case 503:
          errorMessage = 'Service Unavailable: The server is not ready to handle the request. Please try again later.';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    } else if (error instanceof Error) {
      if(error.message.includes('Cannot read property')) {
        errorMessage = 'An unexpected error occurred. Please try again later.';
      } else if (error.message.includes('Timeout')) {
        errorMessage = 'The request took too long to process. Please try again later.';
      } else if (error.message.includes('Network Error')) {
        errorMessage = 'The request could not be completed due to a network issue.';
      } else if (error.message.includes('Cannot match any routes')) {
        errorMessage = 'The requested page could not be found. Please check the URL.';
      } else {
        errorMessage = `${error.name}: ${error.stack}`;
      }
    }

    this.zone.run(() => {
      alert(errorMessage);
    });

    super.handleError(error);
  }
}
