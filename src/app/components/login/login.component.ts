import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../core/Service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform!: FormGroup;
  users: any[] = [];
  type: string = 'students';

  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.createForm();
    this.getCreateForm();
  }

  createForm() {
    this.loginform = this.fb.group({
      type: [this.type],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  getRole(event: any) {
    this.type = event.value;
    this.getCreateForm();
  }

  getCreateForm() {
    this.authService.getCreateForm(this.type).subscribe({
      next: (res: any) => {
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  submit() {
    const formValue = this.loginform.value;

    if (!formValue.email || !formValue.password) {
      this.toastr.error('ادخل الايميل وكلمة المرور');
      return;
    }

    this.authService.getCreateForm(formValue.type).subscribe(
      (res: any[]) => {
        const user = res.find(
          (item: any) =>
            item.email === formValue.email && item.password === formValue.password
        );

        if (user) {
          const model = {
            name: user.name,
            role: formValue.type,
          };

          localStorage.setItem('user', JSON.stringify(model));
          localStorage.setItem('token', user.id.toString());

          this.toastr.success('تم تسجيل الدخول بنجاح');

          if (formValue.type === 'students') {
            this.router.navigate(['/students']);
          } else if (formValue.type === 'Doctor') {
            this.router.navigate(['/newexam']);
          } else {
            this.router.navigate(['/subjects']);
          }
        } else {
          this.toastr.error('البريد أو كلمة المرور غير صحيحة');
        }
      },
      (err) => {
        console.log(err);
        this.toastr.error('مشكلة في السيرفر');
      }
    );
  }
}
