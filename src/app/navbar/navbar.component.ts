import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoaderService } from '../Services/loader.service';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidebar:EventEmitter<any> = new EventEmitter();
  userData
  constructor(protected login:LoginService,public loaderService:LoaderService) { 
    this.userData = this.login.getData()
  }

  ngOnInit(): void {
  }

  toggleSidebarFunc(){
    this.toggleSidebar.emit();
  }
  onLogOut(){
    this.login.removeItems();
  }

}
