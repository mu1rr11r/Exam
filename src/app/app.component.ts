import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavauthComponent } from "./components/navauth/navauth.component";
import { AuthService } from './core/Service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavauthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private readonly AuthService=inject(AuthService)


  ngOnInit(): void {
    this.getUserData()
  }
  getUserData()
  {
    this.AuthService.getRol().subscribe({
      next: (res) => {
        this.AuthService.user .next (res);
      },
    });
  }
}
