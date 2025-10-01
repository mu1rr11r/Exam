import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  type: string = 'students';

  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginform = this.fb.group({
      type: [this.type],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    const formValue = this.loginform.value;

    if (!formValue.email || !formValue.password) {
      this.toastr.error('ادخل الايميل وكلمة المرور');
      return;
    }

    this.authService.getCreateForm(formValue.type).subscribe({
      next: (res: any[]) => {
        const user = res.find(
          item => item.email === formValue.email && item.password === formValue.password
        );

        if (user) {
          const model = { name: user.name, role: formValue.type };
          this.authService.userSubject.next(model);
          localStorage.setItem('user', JSON.stringify(model));
          localStorage.setItem('token', user.id.toString());

          this.toastr.success('تم تسجيل الدخول بنجاح');

          if (formValue.type === 'students') this.router.navigate(['/students']);
          else if (formValue.type === 'Doctor') this.router.navigate(['/newexam']);
          else this.router.navigate(['/subjects']);
        } else {
          this.toastr.error('البريد أو كلمة المرور غير صحيحة');
        }
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('مشكلة في السيرفر');
      }
    });
  }
}
