import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/Services/dialog.service';
import { LoginService } from 'src/app/Services/login.service';
import { AdminData } from '../Interfaces/admin-data.module';
import { AdminService } from '../Services/admin.service';
import * as XLSX from 'xlsx';
import { ConvertExcelService } from 'src/app/Services/convert-excel.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns:any = [];
  dataSource:any;
  AddressList:any = [];
  constructor(
    private admin:AdminService,
    private dialog:DialogService,
    public loginService:LoginService,
    private jsontoexel:ConvertExcelService) {
    this.getAddressList();
   }

  ngOnInit(): void {
    
  }


  getAddressList(){
    this.admin.GetInsurenceFormList().subscribe(res=>{
      console.warn("GetAddressList",res);
      this.AddressList = res;
      this.displayedColumns = ['SrNo','UniqueId','Date','Verification', 'FullName', 'Contact','Actions'];
      this.dataSource = new MatTableDataSource(this.AddressList);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  OnAddAddress(){
    this.dialog.AddNewInsurance('Add',{}).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAddressList();
    });
  }
  OnEditAddress(address:AdminData){
    this.dialog.EditInsurance('Edit',address).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAddressList();
    });
  }
  OnDeleteAddress(address:AdminData){
    this.dialog.DeleteAddress(address).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAddressList();
    });
  }
  OnViewAddress(address:AdminData){
    this.dialog.ViewInsurenceForm('View',address).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.getAddressList();
    });
  }
  OnExportExcel(){
    let fileName= 'ExcelSheet.xlsx';
    this.jsontoexel.exportAsExcelFile(this.AddressList,fileName);
  }
}
