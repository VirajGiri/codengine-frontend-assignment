import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './Pages/pagenotfound/pagenotfound.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { IntercepterService } from './Services/intercepter.service';
import { ErrorInterceptService } from './Services/error-intercept.service';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {Editinsuranceform } from './Pages/editInsuranceform/editinsuranceform.component';
import { DeleteaddressComponent } from './Pages/deleteaddress/deleteaddress.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { RedirectGuardService } from './Services/redirect-guard.service';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewinsurenceformComponent } from './Pages/viewinsurenceform/viewinsurenceform.component';
import { VirtualCardComponent } from './Pages/virtual-card/virtual-card.component';
import { AddeditUserComponent } from './Pages/addedit-user/addedit-user.component';
import { AddinsuranceformComponent } from './Pages/addinsuranceform/addinsuranceform.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,
    DeleteaddressComponent,
    ViewinsurenceformComponent,
    VirtualCardComponent,
    Editinsuranceform,
    AddeditUserComponent,
    AddinsuranceformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule,
  ],
  providers: [
    RedirectGuardService,
    {provide:HTTP_INTERCEPTORS,useClass:IntercepterService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptService,multi:true},
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
