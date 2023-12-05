import { CanActivateFn } from '@angular/router';

export const dirtycheckGuard: CanActivateFn = (route, state) => {
  return true;
};
