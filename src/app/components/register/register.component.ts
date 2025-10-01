import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/Service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userform!: FormGroup;
  students: any[] = [];

  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  ngOnInit(): void {
    this.userform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]]
    });

    this.authService.getCreateForm('students').subscribe({
      next: res => this.students = res,
      error: err => console.log(err)
    });
  }

  submit() {
    if (this.userform.value.password !== this.userform.value.repassword) {
      this.toastr.error("كلمة المرور غير متطابقة");
      return;
    }

    const model = {
      name: this.userform.value.name,
      email: this.userform.value.email,
      password: this.userform.value.password
    };

    const exists = this.students.find(item => item.email === model.email);
    if (exists) {
      this.toastr.error("هذا البريد مسجل من قبل");
      return;
    }

    this.authService.createForm(model).subscribe({
      next: res => {
        this.toastr.success("تم التسجيل بنجاح");

        const userModel = { name: model.name, role: 'students' };
        this.authService.userSubject.next(userModel);
        localStorage.setItem('user', JSON.stringify(userModel));

        this.router.navigate(['/students']);
      },
      error: err => {
        console.log(err);
        this.toastr.error("حصل خطأ أثناء التسجيل");
      }
    });
  }
}
