import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { UsersService } from '../Services/users.service';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatListModule, MatIconModule, MatDividerModule, NavbarComponent]
})
export class SidebarComponent implements OnInit {

  sidebarOpen = true;
  userRole;
  sidebarItems: any = [];
  constructor(
    private router: Router,
    private login: LoginService,
    private user: UsersService,
  ) {
    this.userRole = this.login.getData()!.Role;
    this.login.loadSidebar(this.userRole).subscribe(res => {
      console.log('loadSidebar', res);
      this.sidebarItems = res;
      this.sidebarItems.forEach((element: any) => {
        if (element.module == "Users") {
          this.user.setUserRoles(element.allowedRoles);
        }
      });
    });
    this.router.navigate(['in/' + this.userRole]);
  }

  ngOnInit(): void {
  }

  sidebarToggeler() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  getFullPath(items: any) {
    return items.parentPath + items.path + items.childPath;
  }

}
