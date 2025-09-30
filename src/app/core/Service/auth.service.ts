import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../enviroments/enviro';
import { Observable, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<any>();
  private readonly http = inject(HttpClient);

  constructor(private router: Router) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }


  createForm(model: any) {
    return this.http.post(environment.api + "students", model);
  }

  login(model: any): Observable<any> {
    return this.http.post(environment.api + "login", model).pipe(
      tap((res: any) => {
        if (res?.token && this.isBrowser()) {
          this.setToken(res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.user.next(res.user);
        }
      })
    );
  }

  getCreateForm(type: string) {
    return this.http.get<any[]>(environment.api + type);
  }

  getRol() {
    return this.http.get(environment.api + "login/1");
  }

  setToken(token: string) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  getToken() {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  getUser() {
    if (this.isBrowser()) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;

  }
}




