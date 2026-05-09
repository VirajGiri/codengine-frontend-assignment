import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsersService } from 'src/app/Services/users.service';
import { DialogNavComponent } from '../Shared/dialog-nav/dialog-nav.component';

@Component({
  standalone: true,
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, DialogNavComponent]
})
export class ViewUserComponent implements OnInit {

  userData: any = [];
  title = 'View User';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private user: UsersService,
    private snackbar: MatSnackBar) {
    this.userData = this.data.userData;
    console.log("this.userData", this.userData)
  }

  ngOnInit(): void {
  }
  OnEditProfile() {

  }
}

