import { Routes } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { AdminComponent } from '../Home/Admin/admin/admin.component';
import { CounsellorComponent } from '../Home/Counsellor/counsellor/counsellor.component';
import { ReceptionistComponent } from '../Home/Receptionist/receptionist/receptionist.component';
import { TeamleadComponent } from '../Home/Teamlead/teamlead/teamlead.component';
import { UsersComponent } from '../Pages/users/users.component';
import { ProfileComponent } from '../Pages/profile/profile.component';
import { PagenotfoundComponent } from '../Pages/pagenotfound/pagenotfound.component';
import { authGuard } from '../Services/auth-guard.service';

export const SIDEBAR_ROUTES: Routes = [
  {
    path: '',
    component: SidebarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'admin',
        canActivate: [authGuard],
        data: { role: 'admin' },
        children: [
          { path: '', component: AdminComponent },
          { path: 'home', component: AdminComponent },
          { path: 'users', component: UsersComponent },
          { path: 'profile', component: ProfileComponent }
        ]
      },
      {
        path: 'counsellor',
        canActivate: [authGuard],
        data: { role: 'counsellor' },
        children: [
          { path: '', component: CounsellorComponent },
          { path: 'home', component: CounsellorComponent },
          { path: 'profile', component: ProfileComponent }
        ]
      },
      {
        path: 'receptionist',
        canActivate: [authGuard],
        data: { role: 'receptionist' },
        children: [
          { path: '', component: ReceptionistComponent },
          { path: 'home', component: ReceptionistComponent },
          { path: 'profile', component: ProfileComponent }
        ]
      },
      {
        path: 'teamlead',
        canActivate: [authGuard],
        data: { role: 'teamlead' },
        children: [
          { path: '', component: TeamleadComponent },
          { path: 'home', component: TeamleadComponent },
          { path: 'users', component: UsersComponent },
          { path: 'profile', component: ProfileComponent }
        ]
      }
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];
