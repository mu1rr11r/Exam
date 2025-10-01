import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/Service/auth.service';

@Component({
  selector: 'app-navauth',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navauth.component.html',
  styleUrls: ['./navauth.component.css']
})
export class NavauthComponent implements OnInit {
  private readonly authService = inject(AuthService);
  user: any = null;

  ngOnInit(): void {
    this.authService.user$.subscribe(res => {
      this.user = res;
      console.log("Navbar user:", this.user);
    });
  }

  logout() {
    this.authService.logout();
  }
}
