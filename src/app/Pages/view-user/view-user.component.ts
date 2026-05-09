import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  userData:any =[];
  title = 'View User';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private user:UsersService,
  private snackbar:MatSnackBar) { 
    this.userData = this.data.userData;
    console.log("this.userData", this.userData)
  }

  ngOnInit(): void {
  }
  OnEditProfile(){
    
  }
}
