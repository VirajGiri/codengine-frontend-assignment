import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './Pages/pagenotfound/pagenotfound.component';
import { redirectGuard } from './Services/redirect-guard.service';

export const APP_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'in',
    loadChildren: () => import('./sidebar/sidebar.routes').then(r => r.SIDEBAR_ROUTES),
    canActivate: [redirectGuard]
  },
  { path: '**', component: PagenotfoundComponent }
];
