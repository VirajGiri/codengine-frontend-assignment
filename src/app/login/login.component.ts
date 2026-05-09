import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../Services/login.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule]
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
    const controls = this.loginForm.controls as {[key: string]: any};
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
  
      this.loginService.loginUser(this.loginForm.value.Email!, 
        this.loginForm.value.password!).subscribe(res =>{
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
