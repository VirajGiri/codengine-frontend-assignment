import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { UserData } from 'src/app/Home/Admin/Interfaces/user-data.module';
import { DialogService } from 'src/app/Services/dialog.service';
import { UsersService } from 'src/app/Services/users.service';
import { DialogNavComponent } from '../Shared/dialog-nav/dialog-nav.component';

export const MH_CITIES = [
  'Ahmednagar','Akola','Amravati','Aurangabad','Beed','Bhandara','Buldhana',
  'Chandrapur','Dhule','Gondia','Hingoli','Jalgaon','Jalna','Kolhapur','Latur',
  'Mumbai','Nagpur','Nanded','Nashik','Navi Mumbai','Osmanabad','Palghar',
  'Parbhani','Pune','Raigad','Ratnagiri','Sangli','Satara','Sindhudurg',
  'Solapur','Thane','Wardha','Washim','Yavatmal'
];

@Component({
  standalone: true,
  selector: 'app-addedit-user',
  templateUrl: './addedit-user.component.html',
  styleUrls: ['./addedit-user.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatSelectModule, MatIconModule,
    MatTabsModule, MatProgressSpinner, DialogNavComponent]
})
export class AddeditUserComponent implements OnInit {
  operation: any;
  isAddUser: boolean = false;
  isSubmitted: boolean = false;
  isError: any = {};
  usernameChecking = false;
  usernameTaken = false;
  resetingPassword = false;
  activeTab = 0;
  mhCities = MH_CITIES;

  userForm = new FormGroup({
    Address:      new FormControl('', []),
    AssignEnquiry: new FormControl('', []),
    City:         new FormControl('', []),
    CompletedEnquiry: new FormControl('', []),
    Email:        new FormControl('', [Validators.required, Validators.email]),
    Landmark:     new FormControl('', []),
    MobileNo:     new FormControl('', []),
    Name:         new FormControl('', [Validators.required]),
    Role:         new FormControl('', [Validators.required]),
    State:        new FormControl('Maharashtra', []),
    Zip:          new FormControl('', []),
    isActive:     new FormControl(true, []),
    username:     new FormControl('', [Validators.required, Validators.minLength(3)]),
    _id:          new FormControl('', []),
    Password:     new FormControl('', []),
    BranchName:   new FormControl('', []),
    BranchCity:   new FormControl('', []),
    BranchState:  new FormControl('Maharashtra', []),
  });

  userRoles: any = [];
  title = "User Details";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private user: UsersService,
    private snackbar: MatSnackBar,
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<AddeditUserComponent>
  ) {
    this.operation = this.data.operation;
    if (this.operation === 'Add') {
      this.isAddUser = true;
    } else {
      this.setUpdateUserForm(this.data.updateData);
    }
  }

  ngOnInit(): void {
    const roles = this.user.getUserRoles();
    this.userRoles = roles ? JSON.parse(roles) : [];

    // Auto-generate username as user types their name (add mode only)
    if (this.isAddUser) {
      this.userForm.get('Name')!.valueChanges.subscribe(name => {
        if (!name) return;
        const slug = name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '');
        const current = this.userForm.get('username')!.value || '';
        // Only auto-update if field hasn't been manually edited
        if (!current || current.match(/^[a-z0-9.]+\.\d{3}$/) || current === this.lastAutoUsername) {
          const suffix = Math.floor(100 + Math.random() * 900);
          this.lastAutoUsername = `${slug}.${suffix}`;
          this.userForm.get('username')!.setValue(this.lastAutoUsername, { emitEvent: false });
          this.usernameTaken = false;
        }
      });
    }
  }

  private lastAutoUsername = '';

  setUpdateUserForm(updateData: UserData) {
    this.userForm.patchValue(updateData);
  }

  onUsernameBlur() {
    const uname = this.userForm.get('username')!.value;
    if (!uname || uname.length < 3) return;
    this.usernameChecking = true;
    this.usernameTaken = false;
    const excludeId = this.isAddUser ? undefined : (this.userForm.get('_id')!.value || undefined);
    this.user.CheckUsername(uname, excludeId).subscribe(res => {
      this.usernameChecking = false;
      this.usernameTaken = res.taken;
    });
  }

  onCreateUser() {
    this.isSubmitted = true;
    if (this.userForm.invalid || this.usernameTaken) return;
    const f = this.userForm.value;
    this.user.AddUser(
      f.Name!, f.Email!, f.Role!, f.username!,
      f.Address!, f.City!, f.State!,
      f.MobileNo!, f.Landmark!, f.Zip!,
      f.BranchName!, f.BranchCity!
    ).subscribe(res => {
      if (res.success) {
        this.snackbar.open('User Added!', 'OK', { duration: 4000 });
        this.dialogRef.close(true);
      }
      if (res.errors) {
        this.isError = res.errors;
        this.snackbar.open('Error!', res._message, { duration: 4000 });
      }
    });
  }

  onUpdateUser() {
    this.isSubmitted = true;
    if (this.userForm.invalid) return;
    const f = this.userForm.value;
    this.user.UpdateUser(
      f._id!, f.Name!, f.Role!, f.AssignEnquiry!, f.CompletedEnquiry!,
      f.Address!, f.City!, f.State!,
      f.MobileNo!, f.Landmark!, f.Zip!,
      f.BranchName!, f.BranchCity!
    ).subscribe(res => {
      if (res.status) {
        this.snackbar.open('User Updated!', 'OK', { duration: 4000 });
        this.dialogRef.close(true);
      }
      if (res.errors) {
        this.isError = res.errors;
        this.snackbar.open('Error!', res._message, { duration: 4000 });
      }
    });
  }

  onResetPassword() {
    const userId = this.userForm.get('_id')!.value;
    if (!userId) return;
    this.resetingPassword = true;
    this.user.ResetPasswordAdmin(userId).subscribe(res => {
      this.resetingPassword = false;
      if (res.status) {
        this.snackbar.open('Password reset to 1234', 'OK', { duration: 4000 });
      } else {
        this.snackbar.open('Reset failed: ' + res.message, 'OK', { duration: 4000 });
      }
    });
  }
}
