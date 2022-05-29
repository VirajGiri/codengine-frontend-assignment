import { AdminComponent } from '../Home/Admin/admin/admin.component';
import { PagenotfoundComponent } from '../Pages/pagenotfound/pagenotfound.component';
import { SidebarComponent } from './sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../Services/auth-guard.service';
import { NgModule } from '@angular/core';
import { CounsellorComponent } from '../Home/Counsellor/counsellor/counsellor.component';
import { ReceptionistComponent } from '../Home/Receptionist/receptionist/receptionist.component';
import { TeamleadComponent } from '../Home/Teamlead/teamlead/teamlead.component';
import { UsersComponent } from '../Pages/users/users.component';
import { ProfileComponent } from '../Pages/profile/profile.component';



// loadChildren: () => import('../Home/Admin/admin.module').then(m => m.AdminModule),
const routes: Routes = [
    {
      path: '',
      component: SidebarComponent,
      children: [
        {
          path: 'admin',
          children: [
            {
              path: '',
              component: AdminComponent
            },
            {
              path: 'home',
              component: AdminComponent
            },
            {
              path: 'users',
              component: UsersComponent
            },
            {
              path: 'profile',
              component: ProfileComponent
            }
          ],
          canActivate: [AuthGuardService],
          data: { role: 'admin' }
        },
        {
          path: 'counsellor',
          children: [
            {
              path: '',
              component: CounsellorComponent
            },
            {
              path: 'home',
              component: CounsellorComponent
            },
            {
              path: 'profile',
              component: ProfileComponent
            }
          ],
          canActivate: [AuthGuardService],
          data: {
            role: 'counsellor'
          }
        },
        {
          path: 'receptionist',
          children: [
            {
              path: '',
              component: ReceptionistComponent
            },
            {
              path: 'home',
              component: ReceptionistComponent
            },
            {
              path: 'profile',
              component: ProfileComponent
            }
          ],
          canActivate: [AuthGuardService],
          data: {
            role: 'receptionist'
          }
        },
        {
          path: 'teamlead',
          children: [
            {
              path: '',
              component: TeamleadComponent
            },
            {
              path: 'home',
              component: TeamleadComponent
            },
            {
              path: 'users',
              component: UsersComponent
            },
            {
              path: 'profile',
              component: ProfileComponent
            }

          ],
          canActivate: [AuthGuardService],
          data: {
            role: 'teamlead'
          }
        }
      ],
      canActivate: [AuthGuardService]
    },
    { path: '**', component: PagenotfoundComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SidebarRoutingModule { 
  
}