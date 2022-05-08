import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './Pages/pagenotfound/pagenotfound.component';
import { AuthGuardService } from './Services/auth-guard.service';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'address',component:AddressComponent,canActivate:[AuthGuardService]},
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
