import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window === 'undefined' || !window.localStorage) {
    router.navigate(['/login']);
    return false;
  }

  const userData = localStorage.getItem('user');
  const requiredRole = route.data?.['role'];

  if (userData) {
    const user = JSON.parse(userData);

    if (state.url === '/subjects') {
      if (user.role === 'students' || user.role === 'Doctor') {
        return true;
      } else {
        router.navigate(['/subjects']);
        return false;
      }
    }


    if (user.role === 'Doctor') {
      return true;
    }

    if (requiredRole && user.role === requiredRole) {
      return true;
    }

    router.navigate(['/subjects']);
    return false;
  }

  router.navigate(['/login']);
  return false;
};
