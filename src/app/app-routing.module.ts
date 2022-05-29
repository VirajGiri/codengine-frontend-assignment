import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {PagenotfoundComponent} from './Pages/pagenotfound/pagenotfound.component'
import { RedirectGuardService } from './Services/redirect-guard.service';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'in',
  loadChildren: () => import('./sidebar/sidebar.module').then(m => m.SidebarModule),canActivate: [ RedirectGuardService ]},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
