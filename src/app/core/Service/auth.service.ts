import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../enviroments/enviro';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userSubject = new BehaviorSubject<any>(this.getUser());
  user$ = this.userSubject.asObservable();
  private readonly http = inject(HttpClient);

  constructor(private router: Router) {}
  

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  createForm(model: any) {
    return this.http.post(environment.api + "students", model);
  }

  getCreateForm(type: string) {
    return this.http.get<any[]>(environment.api + type);
  }

  getRol(): Observable<any> {
    return this.http.get(environment.api + "login/1").pipe(
      tap((res: any) => this.userSubject.next(res))
    );
  }

  login(model: any): Observable<any> {
    return this.http.post(environment.api + "login", model).pipe(
      tap((res: any) => {
        if (res?.token && this.isBrowser()) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.userSubject.next(res.user);
        }
      })
    );
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.userSubject.next(null);
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
