import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddressService } from 'src/app/Services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addressData } from 'src/app/Interface/address/address.module';

@Component({
  selector: 'app-addeditaddress',
  templateUrl: './addeditaddress.component.html',
  styleUrls: ['./addeditaddress.component.css']
})
export class AddeditaddressComponent implements OnInit {

  addressForm = new FormGroup({
    CountryName: new FormControl('', [Validators.required, Validators.minLength(40)]),
    Location: new FormControl('', []),
    Address: new FormControl('', [Validators.required]),
    BankName: new FormControl('', []),
    State: new FormControl('', [Validators.required]),
    Zip: new FormControl('', []),
    _id:new FormControl('', [])
  });
  operation
  isAddAddress:Boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private address:AddressService,private snackbar:MatSnackBar) { 
    this.operation = this.data.addressData;
    if(this.operation == 'Add'){
      this.isAddAddress = true;
    }else{
      this.setUpdateAddressForm(this.data.updateData);
    }
  }

  ngOnInit(): void {
  }
  setUpdateAddressForm(data:addressData){
    this.addressForm.patchValue(data);
  }
  onSubmitAddress(){
    if(this.isAddAddress){
      this.address.AddAddress(this.addressForm.value.CountryName,
        this.addressForm.value.Location,
        this.addressForm.value.BankName,
        this.addressForm.value.City,
        this.addressForm.value.State,
        this.addressForm.value.Zip)
        .subscribe(res =>{
          this.snackbar.open("Address Added !",res.message,{
            duration:4000
          })
      })
    }else{
      this.address.UpdateAddress(this.addressForm.value.CountryName,
        this.addressForm.value.Location,
        this.addressForm.value.BankName,
        this.addressForm.value.City,
        this.addressForm.value.State,
        this.addressForm.value.Zip,
        this.addressForm.value._id)
        .subscribe(res =>{
          this.snackbar.open("Address Updated !",res.message,{
            duration:4000
          })
      })
    }

  }

}
