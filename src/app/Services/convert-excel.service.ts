import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ConvertExcelService {

  constructor() { }


  public exportAsExcelFile(json: any[], excelFileName: string): void {
    let readyToExport:any = []
    json.forEach((element :any)=> {
      let data = {
        id: element._id,
        uniqueId: element.uniqueId,
        username: element.username,
        fullName : element.fullName,
        contactOne: element.contactOne,
        mailId: element.mailId,
        address: element.address,
        aadhaarNumber: element.aadhaarNumber,
        isVerified: element.isVerified,
        createdAt: new Date(element.createdAt),
        Date : new Date(element.Date),
        mobileDetails: "Model:"+element.mobileDetails.model +"company:"+element.mobileDetails.company+"color:"+element.mobileDetails.color + "imei:"+element.mobileDetails.imei,
        physicalDetails : JSON.stringify(element.mobileDetails.physicalDetails),
        paymentDetails : "Amount:" + element.paymentDetails.Amount + "TransactionId:"+element.paymentDetails.TransactionId,
      }
      readyToExport.push(data);
    });
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public exportTabletoExcelFile(table_id:any,filename:string){
    /* pass here the table id */
    
    let element = document.getElementById(table_id || 'excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb,filename);
  }
}
