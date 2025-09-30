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
    this.creatform();
    this.getCreateForm();
  } //

  creatform() {
    this.userform = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]]
    });
  }

  getCreateForm() {
    this.authService.getCreateForm('students').subscribe({
      next: (res: any) => {
        console.log(res);
        this.students = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  submit() {
    const model = {
      name: this.userform.get('name')?.value,
      email: this.userform.get('email')?.value,
      password: this.userform.get('password')?.value
    };

    let index = this.students.findIndex(item => item.email === this.userform.value.email);

    if (index !== -1) {
      this.toastr.error("هذا البريد مسجل من قبل");
    } else {
    this.authService.createForm(model).subscribe({
  next: (res) => {
    console.log(res);
    this.toastr.success("تم التسجيل بنجاح");

    // ✅ احفظ بيانات المستخدم الجديد
    localStorage.setItem('user', JSON.stringify(model));

    // ✅ بعد التسجيل دخّله على صفحة المواد (أو أي صفحة انت عايز)
    this.router.navigate(['/students']);
  },
  error: (err) => {
    console.log(err);
    this.toastr.error("حصل خطأ أثناء التسجيل");
  }
});

    }
  }
}
