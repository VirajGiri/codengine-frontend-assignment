import { AdminComponent } from '../Home/Admin/admin/admin.component';
import { PagenotfoundComponent } from '../Pages/pagenotfound/pagenotfound.component';
import { SidebarComponent } from './sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../Services/auth-guard.service';
import { NgModule } from '@angular/core';
import { CounsellorComponent } from '../Home/Counsellor/counsellor/counsellor.component';
import { ReceptionistComponent } from '../Home/Receptionist/receptionist/receptionist.component';
import { TeamleadComponent } from '../Home/Teamlead/teamlead/teamlead.component';
import { UsersComponent } from '../Home/Admin/users/users.component';



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
          ],
          canActivate: [AuthGuardService],
          data: {
            role: 'counsellor'
          }
        },
        {
          path: 'receptionist',
          component: ReceptionistComponent,
          canActivate: [AuthGuardService],
          data: {
            role: 'receptionist'
          }
        },
        {
          path: 'teamlead',
          component: TeamleadComponent,
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