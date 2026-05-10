import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/Services/dialog.service';
import { LoginService } from 'src/app/Services/login.service';
import { UsersService } from 'src/app/Services/users.service';
import { AdminService } from '../../Home/Admin/Services/admin.service';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule]
})
export class UsersComponent implements OnInit {

  displayedColumns:any = [];
  dataSource:any;
  UsersList:any = [];
  constructor(
    private admin:AdminService,
    private login:LoginService,
    private user:UsersService,
    private dialog:DialogService,
    public loginService:LoginService) { 
    }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList(){
    this.user.GetAllUsers().subscribe(res=>{
      this.UsersList = res;
      this.displayedColumns = ['SrNo','Role','Name','Username','MobileNo','BranchCity','Actions'];
      this.dataSource = new MatTableDataSource(this.UsersList);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  OnCreateUser(){
    this.dialog.AddEditUser('Add',{}).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getUsersList();
    });
  }
  OnEditUser(userData:any){
    this.dialog.AddEditUser('Edit',userData).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getUsersList();
    });
  }
  OnDeleteUser(userData:any){
    this.dialog.DeleteUser(userData).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getUsersList();
    });
  }
  OnViewUser(userData:any){
    this.dialog.ViewUser(userData).subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
