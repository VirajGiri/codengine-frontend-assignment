import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/Services/login.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule]
})
export class ProfileComponent implements OnInit {

  userDetails: any = {};
  isEditing = false;

  profileForm = new FormGroup({
    _id:              new FormControl(''),
    Name:             new FormControl(''),
    Email:            new FormControl(''),
    MobileNo:         new FormControl(''),
    Role:             new FormControl(''),
    Address:          new FormControl(''),
    Landmark:         new FormControl(''),
    City:             new FormControl(''),
    State:            new FormControl('Maharashtra'),
    Zip:              new FormControl(''),
    AssignEnquiry:    new FormControl(''),
    CompletedEnquiry: new FormControl(''),
  });

  constructor(
    private login: LoginService,
    private user: UsersService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.GetUserProfileData();
  }

  GetUserProfileData() {
    this.login.userProfile().subscribe(res => {
      this.userDetails = res[0];
    });
  }

  startEdit() {
    this.profileForm.patchValue(this.userDetails);
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveProfile() {
    const f = this.profileForm.value;
    this.user.UpdateUser(
      f._id!, f.Name!, f.Role!, f.AssignEnquiry!,
      f.CompletedEnquiry!, f.Address!, f.City!, f.State!,
      f.MobileNo!, f.Landmark!, f.Zip!,
      '', ''  // BranchName, BranchCity — not edited from profile
    ).subscribe((res: any) => {
      if (res.status) {
        this.snackbar.open('Profile updated!', 'OK', { duration: 3000 });
        this.isEditing = false;
        this.GetUserProfileData();
      } else {
        this.snackbar.open('Update failed: ' + (res.message || 'Unknown error'), 'OK', { duration: 4000 });
      }
    });
  }
}
