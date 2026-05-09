import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  standalone: true,
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
  imports: [CommonModule, MatDialogModule, MatButtonModule]
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
