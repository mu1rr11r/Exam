import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logtGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined' && window.localStorage) {
    const token = localStorage.getItem('token');

    if (token) {
      return router.createUrlTree(['/students']);
    } else {
      return true;
    }
  }

  return true;
};
