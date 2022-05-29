import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConvertExcelService } from 'src/app/Services/convert-excel.service';
import { DialogService } from 'src/app/Services/dialog.service';
import { CounsellorService } from '../Services/counsellor.service';

@Component({
  selector: 'app-counsellor',
  templateUrl: './counsellor.component.html',
  styleUrls: ['./counsellor.component.css']
})
export class CounsellorComponent implements OnInit {

  insuranceList:any=[];
  displayedColumns:any = [];
  dataSource:any;
  constructor(
    private counsellor:CounsellorService,
    private dialog:DialogService,
    private jsontoexel:ConvertExcelService) {
    this.getInsuranceList();
   }

  ngOnInit(): void {
  }
  getInsuranceList(){
    this.counsellor.GetInsurenceFormList().subscribe(res=>{
      console.warn("GetAddressList",res);
      this.insuranceList = res;
      this.displayedColumns = ['SrNo','UniqueId','Date','Verification', 'FullName', 'Contact','Actions'];
      this.dataSource = new MatTableDataSource(this.insuranceList);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  OnAddInsurance(){
    this.dialog.AddNewInsurance('Add',{}).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getInsuranceList();
    });
  }
  OnEditInsurance(InsuranceData:any){
    this.dialog.EditInsurance('Edit',InsuranceData).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getInsuranceList();
    });
  }
  OnDeleteInsurance(InsuranceData:any){
    this.dialog.DeleteAddress(InsuranceData).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getInsuranceList();
    });
  }
  OnViewInsurance(InsuranceData:any){
    this.dialog.ViewInsurenceForm('View',InsuranceData).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.getAddressList();
    });
  }
  OnExportExcel(){
    let fileName= 'ExcelSheet.xlsx';
    this.jsontoexel.exportAsExcelFile(this.insuranceList,fileName);
  }
}
