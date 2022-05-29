import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/Services/dialog.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails:any = [];
  constructor(private login:LoginService,
    private dialog:DialogService,) { 
    
  }

  ngOnInit(): void {

    this.GetUserProfileData();
  }
  GetUserProfileData(){
    this.login.userProfile().subscribe(res=>{
      console.log("userProfile",res);
      this.userDetails = res[0];
    })
  }

  OnEditProfile(){
      this.dialog.AddEditUser('Edit',this.userDetails).subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.GetUserProfileData();
      });
  }
  

}
