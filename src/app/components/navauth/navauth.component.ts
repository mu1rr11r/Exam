import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../core/Service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navauth',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navauth.component.html',
  styleUrl: './navauth.component.css'
})
export class NavauthComponent implements OnInit {
  private readonly authService = inject(AuthService);
  user: any = null;

  ngOnInit(): void {
    // ✅ جِب اليوزر من localStorage أول ما يبدأ
    this.user = this.authService.getUser();

    // ✅ استمع لأي تغييرات جديدة في اليوزر (لما يعمل Login أو Logout)
    this.authService.user.subscribe(res => {
      if (res) {
        this.user = res;
      } else {
        this.user = null;
      }
      console.log("User from navauth:", this.user);
    });
  }

  logout() {
    this.authService.logout();
  }
}
