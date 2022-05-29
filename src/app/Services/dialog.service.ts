import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserData } from '../Home/Admin/Interfaces/user-data.module';
import { addressData } from '../Interface/address/address.module';
import { AddeditUserComponent } from '../Pages/addedit-user/addedit-user.component';
import { AddinsuranceformComponent } from '../Pages/addinsuranceform/addinsuranceform.component';
import { DeleteaddressComponent } from '../Pages/deleteaddress/deleteaddress.component';
import { Editinsuranceform } from '../Pages/editInsuranceform/editinsuranceform.component';
import { ViewinsurenceformComponent } from '../Pages/viewinsurenceform/viewinsurenceform.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  ViewInsurenceForm(operation: string,updateData:addressData){
    const addressDialog = this.dialog.open(ViewinsurenceformComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {
        addressData: operation,
        updateData:updateData
      },
      panelClass:"custom-dialog-class"
    });
    return addressDialog.afterClosed();
  }
  AddNewInsurance(operation: string,updateData:addressData){
    const addressDialog = this.dialog.open(AddinsuranceformComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {
        addressData: operation,
        updateData:updateData
      },
      panelClass:"custom-dialog-class"
    });
    return addressDialog.afterClosed();
  }
  EditInsurance(operation: string,updateData:addressData){
    const addressDialog = this.dialog.open(Editinsuranceform, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {
        addressData: operation,
        updateData:updateData
      },
      panelClass:"custom-dialog-class"
    });
    return addressDialog.afterClosed();
  }
  DeleteAddress(updateData:addressData){
    const addressDialog = this.dialog.open(DeleteaddressComponent, {
      data: {
        updateData:updateData
      },
    });
    return addressDialog.afterClosed();
  }
  AddEditUser(operation: string,updateData:UserData){
    const userDialog = this.dialog.open(AddeditUserComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {
        operation: operation,
        updateData:updateData
      },
      panelClass:"custom-dialog-class"
    });
    return userDialog.afterClosed();
  }
 
}
