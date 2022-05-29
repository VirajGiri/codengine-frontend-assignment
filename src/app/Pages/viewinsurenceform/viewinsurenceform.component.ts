import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminData } from 'src/app/Home/Admin/Interfaces/admin-data.module';
import { AddressService } from 'src/app/Services/address.service';
import { DialogService } from 'src/app/Services/dialog.service';

@Component({
  selector: 'app-viewinsurenceform',
  templateUrl: './viewinsurenceform.component.html',
  styleUrls: ['./viewinsurenceform.component.css']
})
export class ViewinsurenceformComponent implements OnInit {
  InsuranceFormData:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private address:AddressService,
  private snackbar:MatSnackBar,
  private dialog:DialogService) { 
    this.InsuranceFormData = this.data.updateData;
    console.log("this.InsuranceFormData",this.InsuranceFormData);
  }

  ngOnInit(): void {
  }

  getPhysicalDetails(obj:any){
   return Object.keys(obj).filter(k => obj[k])
  }
  OnEditAddress(address:AdminData){
    this.dialog.EditInsurance('Edit',address).subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
