import { Routes } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NewExamComponent } from './components/new-exam/new-exam.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

import { authGuard } from './core/guards/auth.guard';
import { logtGuard } from './core/guards/logt.guard';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [logtGuard] },
  { path: 'login', component: LoginComponent, canActivate: [logtGuard] },

  { path: 'newexam', component: NewExamComponent, canActivate: [authGuard], data: { role: 'Doctor' } },

  { path: 'students', component: StudentsComponent, canActivate: [authGuard], data: { role: 'Doctor' } },

  { path: 'subjects', component: SubjectsComponent, canActivate: [authGuard] , data: { role: 'students' }},

  { path: 'unauthorized', component: UnauthorizedComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
