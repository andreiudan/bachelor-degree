import { CanActivateFn } from '@angular/router';
import { authGuard } from './auth.guard';

export const guestGuard: CanActivateFn = (route, state) => {

  return !authGuard(route, state);
};
