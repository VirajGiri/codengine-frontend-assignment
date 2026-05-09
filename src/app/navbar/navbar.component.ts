import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoaderService } from '../Services/loader.service';
import { LoginService } from '../Services/login.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, AsyncPipe, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule]
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
  userData
  constructor(protected login: LoginService, public loaderService: LoaderService) {
    this.userData = this.login.getData()
  }

  ngOnInit(): void {
  }

  toggleSidebarFunc() {
    this.toggleSidebar.emit();
  }
  onLogOut() {
    this.login.removeItems();
  }

}

