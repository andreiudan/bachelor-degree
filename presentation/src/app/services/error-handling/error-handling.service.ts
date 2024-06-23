import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService extends ErrorHandler {

  constructor(private zone: NgZone, private router: Router, private authService: AuthenticationService, private snackBar: MatSnackBar) { 
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
          errorMessage = `${error.name}: ${error.error.message}`;
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
      } else {
        errorMessage = `${error.name}: ${error.stack}`;
      }
    }

    this.zone.run(() => {
      this.snackBar.open(errorMessage, 'Close', { duration: 10000 });
    });

    super.handleError(error);
  }
}
