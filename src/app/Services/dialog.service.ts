import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { addressData } from '../Interface/address/address.module';
import { AddeditaddressComponent } from '../Pages/addeditaddress/addeditaddress.component';
import { DeleteaddressComponent } from '../Pages/deleteaddress/deleteaddress.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  AddEditAddress(operation: string,updateData:addressData){
    const addressDialog = this.dialog.open(AddeditaddressComponent, {
      width: '80%',
      height: '90%',
      data: {
        addressData: operation,
        updateData:updateData
      },
    });
    return addressDialog.afterClosed();
  }
  DeleteAddress(updateData:addressData){
    const addressDialog = this.dialog.open(DeleteaddressComponent, {
      width: '60%',
      height: '40%',
      data: {
        updateData:updateData
      },
    });
    return addressDialog.afterClosed();
  }
 
}
