import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminData } from 'src/app/Home/Admin/Interfaces/admin-data.module';
import { AddressService } from 'src/app/Services/address.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { VirtualCardComponent } from '../virtual-card/virtual-card.component';
import { DialogNavComponent } from '../Shared/dialog-nav/dialog-nav.component';

@Component({
  standalone: true,
  selector: 'app-viewinsurenceform',
  templateUrl: './viewinsurenceform.component.html',
  styleUrls: ['./viewinsurenceform.component.css'],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatTabsModule, VirtualCardComponent, DialogNavComponent]
})
export class ViewinsurenceformComponent implements OnInit {
  InsuranceFormData:any;
  title = 'Mobile Insurance Form';
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
