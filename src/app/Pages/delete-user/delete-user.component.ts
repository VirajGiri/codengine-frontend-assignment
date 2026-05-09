import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private user:UsersService,private snackbar:MatSnackBar) {
    console.log("this.data.updateData",this.data.updateData);
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("this.data.updateData",this.data.updateData);
    this.user.deleteUser(this.data.updateData._id).subscribe(res =>{
      console.log(res);
      this.snackbar.open("user Deleted !",res.message,{
        duration:4000
      })
    })
  }

}
