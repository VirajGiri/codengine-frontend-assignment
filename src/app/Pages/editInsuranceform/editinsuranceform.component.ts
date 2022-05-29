import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddressService } from 'src/app/Services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-editinsuranceform',
  templateUrl: './editinsuranceform.component.html',
  styleUrls: ['./editinsuranceform.component.css']
})
export class Editinsuranceform implements OnInit {

  addressForm = new FormGroup({
    mailId: new FormControl('', [Validators.required, Validators.minLength(40)]),
    username: new FormControl('', []),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', []),
    fullName: new FormControl('', [Validators.required]),
    address: new FormControl('', []),
    contactOne:new FormControl('', []),
    contactTwo:new FormControl('', []),
    aadhaarNumber:new FormControl('', []),
    mobileDetails: new FormGroup({
      company:new FormControl('', []),
      model:new FormControl('', []),
      imei:new FormControl('', []),
      color:new FormControl('', []),
      physicalDetails: new FormGroup({
        Dent:new FormControl('', []),
        Scratch:new FormControl('', []),
        CameraFront:new FormControl('', []),
        CameraBack:new FormControl('', []),
        Speakers:new FormControl('', []),
        Mic:new FormControl('', []),
        Network:new FormControl('', []),
        HeadphoneJack:new FormControl('', []),
        ChargerSocket:new FormControl('', []),
        ScreenDamage:new FormControl('', []),
        Fingerprint:new FormControl('', []),
      })
    }),
    aadhaar_pic_front:new FormControl(null, []),
    aadhaar_pic_back:new FormControl(null, []),
    mobile_photo_front:new FormControl(null, []),
    mobile_photo_back:new FormControl(null, []),
    paymentDetails: new FormGroup({
      Amount:new FormControl('', []),
      TransactionId:new FormControl('', []),
    }),
    uniqueId:new FormControl('', []),
    userId:new FormControl('', []),
    _id:new FormControl('', []),
    isActive:new FormControl('', []),
    isDeleted:new FormControl('', []),
    isVerified:new FormControl('', []),
    createdAt:new FormControl('', []),
    Date:new FormControl('', []),
    formBy:new FormControl('', []),
  });
  operation
  isAddAddress:Boolean = false;
  isViewAddress:Boolean = false;
  tabValue = 'Address';
  selectedIndex:number = 0;
  aadhaarPicFront: File | any = null;
  aadhaarPicBack: File | any = null;
  mobilePhotoFront: File | any = null;
  mobilePhotoBack: File | any = null;
  
  selectedFiles:any = [];
  currentFile?: File;
  progress = 0;
  fileCount = 0;
  message = '';
  fileInfos?: Observable<any>;
  downloadedFiles:any = [{
    'aadhaar_pic_front':'',
    'aadhaar_pic_back':'',
    'mobile_photo_front': '',
    'mobile_photo_back': ''
  }]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private address:AddressService,
  private snackbar:MatSnackBar,
  private sanitizer: DomSanitizer) { 
    this.operation = this.data.addressData;
    if(this.operation == 'Add'){
      this.isAddAddress = true;
    }else{
      this.setUpdateAddressForm(this.data.updateData);
    }
  }

  ngOnInit(): void {
  }
  addTabValue(event:any){
    this.tabValue = event.tab.textLabel;
  }
  async setUpdateAddressForm(data:any){
    var reader = new FileReader();
    await this.onDownloadFile(data.aadhaar_pic_front,'aadhaar_pic_front');
    await this.onDownloadFile(data.aadhaar_pic_back,'aadhaar_pic_back');
    await this.onDownloadFile(data.mobile_photo_front,'mobile_photo_front');
    await this.onDownloadFile(data.mobile_photo_back,'mobile_photo_back');
    console.log("address data", this.downloadedFiles);
    await this.addressForm.patchValue(data);
  }
  onChange(event:any,pic:string) {
    console.log(event.target.files);
    var reader = new FileReader();
    if(pic == 'aadhaar_pic_front'){
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (_event) => { 
        this.aadhaarPicFront = reader.result; 
      }
      this.selectedFiles.push({
        "file":event.target.files[0],
        "filefor":"aadhaar_pic_front"});
    } 
    if(pic == 'aadhaar_pic_back'){
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (_event) => { 
        this.aadhaarPicBack = reader.result; 
      }
      this.selectedFiles.push({
        "file":event.target.files[0],
        "filefor":"aadhaar_pic_back"});
    } 
    if(pic == 'mobile_photo_front'){
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (_event) => { 
        this.mobilePhotoFront = reader.result; 
      }
      this.selectedFiles.push({
        "file":event.target.files[0],
        "filefor":"mobile_photo_front"});
    }
    if(pic == 'mobile_photo_back'){
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (_event) => { 
        this.mobilePhotoBack = reader.result; 
      }
      this.selectedFiles.push({
        "file":event.target.files[0],
        "filefor":"mobile_photo_back"});
    }
    console.log(this.aadhaarPicFront, this.aadhaarPicBack, this.mobilePhotoFront);
  }
  
  onUpload():void{
      let insurenceId = this.addressForm.value._id
      this.progress = 0;
      this.fileCount = Object.keys(this.selectedFiles).length;
      console.log("this.fileCount",this.fileCount, this.selectedFiles,insurenceId);
        for(let element in this.selectedFiles){
          console.log("element",this.selectedFiles[element].file);
          const file: File | null = this.selectedFiles[element].file;
          if (file) {
            this.currentFile = file;
            this.address.upload(this.currentFile,insurenceId,this.selectedFiles[element].filefor).subscribe((event: any) => {
                if(event){
                  if (event.type === HttpEventType.UploadProgress) {
                    this.progress = Math.round(100 * event.loaded / event.total);
                  } else if (event instanceof HttpResponse) {
                    console.log("event",event);
                    if(event.body.success){
                      this.message = event.body.message;
                      this.fileCount -=1;
                      // this.onDownloadFile(event.body.path,this.selectedFiles[element].filefor);
                    }
                  }
                }
              });
          }
        }
  }

  onDownloadFile(path:string,pathFor:string){
    this.address.download(path).subscribe(Blob =>{
      console.log("download",Blob)
      this.downloadedFiles[0][pathFor] = Blob;
      var reader = new FileReader();
      if(pathFor == 'aadhaar_pic_front'){
        reader.readAsDataURL(this.downloadedFiles[0]['aadhaar_pic_front']); 
        reader.onload = (_event) => { 
          this.aadhaarPicFront = reader.result; 
        }
      }
      if(pathFor == 'aadhaar_pic_back'){
        reader.readAsDataURL(this.downloadedFiles[0]['aadhaar_pic_back']); 
        reader.onload = (_event) => { 
          this.aadhaarPicBack = reader.result; 
        }
      }
      if(pathFor == 'mobile_photo_front'){
        reader.readAsDataURL(this.downloadedFiles[0]['mobile_photo_front']); 
        reader.onload = (_event) => { 
          this.mobilePhotoFront = reader.result; 
        }
      }
      if(pathFor == 'mobile_photo_back'){
        reader.readAsDataURL(this.downloadedFiles[0]['mobile_photo_back']); 
        reader.onload = (_event) => { 
          this.mobilePhotoBack = reader.result; 
        }
      }
      // this.downloadedFiles[0][pathFor] = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(Blob));
    });
  }


  onSubmitAddress(){
    console.log("addressForm",this.addressForm.value);
    if(this.isAddAddress){
      this.addressForm.value.username = this.addressForm.value.mailId;
      let isActive = true;
      let isDeleted = false;
      this.address.UpdateAddress(this.addressForm.value.userId,
        this.addressForm.value.username,this.addressForm.value.mailId,
        this.addressForm.value.password,this.addressForm.value.confirm_password,this.addressForm.value.fullName,
        this.addressForm.value._id,this.addressForm.value.aadhaarNumber,
        this.addressForm.value.contactOne,this.addressForm.value.contactTwo,this.addressForm.value.address,
        this.addressForm.value.mobileDetails,this.addressForm.value.paymentDetails,
        isActive,isDeleted, this.addressForm.value.formBy)
        .subscribe(res =>{
          this.snackbar.open("Address Updated !",res.message,{
            duration:4000
          })
      })
    }

  }

}
