import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from './sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthGuardService } from '../Services/auth-guard.service';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CounsellorComponent } from '../Home/Counsellor/counsellor/counsellor.component';
import { ReceptionistComponent } from '../Home/Receptionist/receptionist/receptionist.component';
import { TeamleadComponent } from '../Home/Teamlead/teamlead/teamlead.component';
import { SidebarRoutingModule } from './sidebar-routing.module';
import { AdminComponent } from '../Home/Admin/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { UsersComponent } from '../Pages/users/users.component';
import { ProfileComponent } from '../Pages/profile/profile.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    CounsellorComponent,
    ReceptionistComponent,
    TeamleadComponent,
    AdminComponent,
    UsersComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule  
  ],
  exports: [],
  providers: [AuthGuardService]
})
export class SidebarModule { }
