import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebarOpen = true;
  userRole;
  sidebarItems:any = [];
  constructor(
    private router: Router,
    private login:LoginService,
    private user:UsersService,
  ) {

    this.userRole = this.login.getData().Role;
    this.login.loadSidebar(this.userRole).subscribe(res=>{
      console.log('loadSidebar',res);
      this.sidebarItems = res;
      this.sidebarItems.forEach((element:any) => {
        if(element.module == "Users"){
          this.user.setUserRoles(element.allowedRoles);
        }
      });
    })
    this.router.navigate(['in/'+this.userRole]);
   }

  ngOnInit(): void {
  }
 
  sidebarToggeler(){
    this.sidebarOpen = !this.sidebarOpen;
  }
  getFullPath(items:any){
    return items.parentPath + items.path + items.childPath;
  }
  
}