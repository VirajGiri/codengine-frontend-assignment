import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    Email: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;
  constructor(private loginService:LoginService, private snackbar:MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group(
      {
        Email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(12)
          ]
        ]
      })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.loginForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}

  onSubmit() {
    this.submitted = true;
    
    console.log("this.loginForm.invalid",this.loginForm.invalid, this.findInvalidControls())
      if (this.loginForm.invalid) {
        return;
      }else{
  
      this.loginService.loginUser(this.loginForm.value.Email, 
        this.loginForm.value.password).subscribe(res =>{
        console.log("loginForm",res)
        if(res.success){
        this.snackbar.open("Login Success !","",{
          duration:4000
        })
        this.loginService.setToken(res.token);
        this.loginService.login(res.data);
      }else{
        this.snackbar.open("Login Error !",res.message,{
          duration:4000
        })
      }
      })
    }
  }
}
