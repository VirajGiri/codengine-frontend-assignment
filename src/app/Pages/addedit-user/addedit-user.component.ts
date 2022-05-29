import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { UserData } from 'src/app/Home/Admin/Interfaces/user-data.module';
import { DialogService } from 'src/app/Services/dialog.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-addedit-user',
  templateUrl: './addedit-user.component.html',
  styleUrls: ['./addedit-user.component.css']
})
export class AddeditUserComponent implements OnInit {
  operation:any
  isAddUser:boolean = false;
  isSubmitted :boolean = false;
  isError:any;
  userForm = new FormGroup({
    Address: new FormControl('', []),
    AssignEnquiry: new FormControl('', []),
    City: new FormControl('', []),
    CompletedEnquiry: new FormControl('', []),
    Email: new FormControl('', [Validators.required, Validators.minLength(40)]),
    Landmark: new FormControl('', []),
    MobileNo: new FormControl('', []),
    Name: new FormControl('', []),
    Role: new FormControl('', []),
    State: new FormControl('Maharashtra', []),
    Zip: new FormControl('', []),
    isActive: new FormControl(true, []),
    username: new FormControl('', []),
    _id: new FormControl('', []),
  })
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private user:UsersService,
  private snackbar:MatSnackBar,
  private sanitizer: DomSanitizer,
  public dialogRef: MatDialogRef<AddeditUserComponent>) { 
    this.operation = this.data.operation;
    if(this.operation == 'Add'){
      this.isAddUser = true;
    }else{
      this.setUpdateUserForm(this.data.updateData);
    }
  }

  ngOnInit(): void {

  }


  setUpdateUserForm(updateData:UserData){
    this.userForm.patchValue(updateData);
  }

  onCreateUser(){
    this.isSubmitted = true;
    this.user.AddUser(this.userForm.value.Name,this.userForm.value.Email,
      this.userForm.value.Role,this.userForm.value.username,
      this.userForm.value.Password, this.userForm.value.Address,
      this.userForm.value.City, this.userForm.value.State,
      this.userForm.value.MobileNo,this.userForm.value.Landmark,
      this.userForm.value.Zip).subscribe(res=>{
      console.log('AddUser',res);
      if(res.success){
        this.snackbar.open("User Added !",res.message,{
          duration:4000
        });
        this.dialogRef.close();
      }
      if(res.errors){
        this.isError = res.errors;
        this.userForm.controls['Email'].setErrors({'incorrect': true});
        this.snackbar.open("Error !",res._message,{
          duration:4000
        })
      }
    })
  }
  onUpdateUser(){
    console.log(this.userForm.value);
    
    this.isSubmitted = true;
    this.user.UpdateUser(this.userForm.value._id,this.userForm.value.Name,
      this.userForm.value.Role,this.userForm.value.AssignEnquiry,
      this.userForm.value.CompletedEnquiry, this.userForm.value.Address,
      this.userForm.value.City, this.userForm.value.State,
      this.userForm.value.MobileNo,this.userForm.value.Landmark,
      this.userForm.value.Zip).subscribe(res=>{
      console.log('UpdateUser',res);
      if(res.status){
        this.snackbar.open("Update Added !",res.message,{
          duration:4000
        });
        this.dialogRef.close();
      }
      if(res.errors){
        this.isError = res.errors;
        this.userForm.controls['Email'].setErrors({'incorrect': true});
        this.snackbar.open("Error !",res._message,{
          duration:4000
        })
      }
    })
  }

}
