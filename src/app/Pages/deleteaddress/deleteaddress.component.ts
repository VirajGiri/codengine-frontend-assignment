import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { AddressService } from 'src/app/Services/address.service';

@Component({
  standalone: true,
  selector: 'app-deleteaddress',
  templateUrl: './deleteaddress.component.html',
  styleUrls: ['./deleteaddress.component.css'],
  imports: [CommonModule, MatDialogModule, MatButtonModule]
})
export class DeleteaddressComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private address:AddressService,private snackbar:MatSnackBar) {
    console.log("this.data.updateData",this.data.updateData);
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log("this.data.updateData",this.data.updateData);
    this.address.DeleteInsurance(this.data.updateData._id).subscribe(res =>{
      console.log(res);
      this.snackbar.open("Address Deleted !",res.message,{
        duration:4000
      })
    })
  }
}
