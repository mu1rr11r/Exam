import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavauthComponent } from './components/navauth/navauth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavauthComponent],
  template: `
    <app-navauth></app-navauth>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
