import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from './Services/login.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'NicksMobileGallery';
  constructor(
    private router: Router,
    private login: LoginService,
  ) {
    if (this.login.isLoggedIn()) {
      this.router.navigate(['in']);
    }
  }
}

