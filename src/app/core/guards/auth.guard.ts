import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined' && window.localStorage) {
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);
      const requiredRole = route.data?.['role'];

      if (requiredRole && user.role !== requiredRole) {
        router.navigate(['/subjects']);
        return false;
      }

      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  return false;
};
