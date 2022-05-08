import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { addressData } from '../Interface/address/address.module';
import { AddressService } from '../Services/address.service';
import { DialogService } from '../Services/dialog.service';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit{

  displayedColumns:any = [];
  dataSource:any;
  AddressList:any = [];
  constructor(protected address:AddressService,private dialog:DialogService,public loginService:LoginService) {
    this.getAddressList();
   }

  ngOnInit(): void {
    
  }


  getAddressList(){
    this.address.GetAddressList().subscribe(res=>{
      console.warn("GetAddressList",res);
      this.AddressList = res;
      this.displayedColumns = ['CountryName','State','BankName', 'Zip', 'Location','Actions'];
      this.dataSource = new MatTableDataSource(this.AddressList);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  OnAddAddress(){
    this.dialog.AddEditAddress('Add',{}).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAddressList();
    });

  }
  OnEditAddress(address:addressData){
    this.dialog.AddEditAddress('Edit',address).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAddressList();
    });

  }
  OnDeleteAddress(address:addressData){
    this.dialog.DeleteAddress(address).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAddressList();
    });
  }
  OnViewAddress(address:addressData){
    this.dialog.AddEditAddress('Edit',address).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAddressList();
    });
  }
}
