import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AddressService } from 'src/app/Services/address.service';

@Component({
  selector: 'app-addinsuranceform',
  templateUrl: './addinsuranceform.component.html',
  styleUrls: ['./addinsuranceform.component.css']
})
export class AddinsuranceformComponent implements OnInit {

  insuranceForm = new FormGroup({
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
    formBy:new FormControl('', [])
  });
  
  isUploadPhoto:Boolean = false;
  isViewAddress:Boolean = false;
  isFromComplete:Boolean = false;
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
  private sanitizer: DomSanitizer,
  public dialogRef: MatDialogRef<AddinsuranceformComponent>) { 
    
  }

  ngOnInit(): void {
  }

  addTabValue(event:any){
    this.tabValue = event.tab.textLabel;
  }
  isSelected(index: number) {
    if (this.selectedIndex == index) {
        return false;
    } else {
        return true;
    }
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
      let insurenceId = this.insuranceForm.value._id
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
                      this.selectedIndex = 4;
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
    console.log("addressForm",this.insuranceForm.value);
    if(this.insuranceForm.value){
      this.insuranceForm.value.username = this.insuranceForm.value.mailId;
      this.address.AddInsurance(this.insuranceForm.value.mailId,this.insuranceForm.value.username,
        this.insuranceForm.value.password,this.insuranceForm.value.contactOne,
        this.insuranceForm.value.contactTwo,this.insuranceForm.value.aadhaarNumber,
        this.insuranceForm.value.fullName,this.insuranceForm.value.address,
        this.insuranceForm.value.mobileDetails,this.insuranceForm.value.paymentDetails)
        .subscribe(res =>{
          if(res.success){
            console.log("AddInsurance",res);
            this.insuranceForm.patchValue(res.data);
            console.log("AddInsurance",this.insuranceForm.value);
            this.isUploadPhoto = true;
            this.selectedIndex = 3;
            this.snackbar.open("Insurance Added !",res.message,{
              duration:4000
            })
          }
          if(res.errors){
            this.selectedIndex = 2;
            this.snackbar.open("Error !",res._message,{
              duration:4000
            })
          }
          
          
      })
    }
  }

  OnCreateInsurance(){
    console.log("OnCreateInsurance",this.insuranceForm.value);
    this.insuranceForm.value.username = this.insuranceForm.value.mailId;
    let isActive = true;
    let isDeleted = false;
    this.address.UpdateAddress(this.insuranceForm.value.userId,
      this.insuranceForm.value.username,this.insuranceForm.value.mailId,
      this.insuranceForm.value.password,this.insuranceForm.value.confirm_password,this.insuranceForm.value.fullName,
      this.insuranceForm.value._id,this.insuranceForm.value.aadhaarNumber,
      this.insuranceForm.value.contactOne,this.insuranceForm.value.contactTwo,this.insuranceForm.value.address,
      this.insuranceForm.value.mobileDetails,this.insuranceForm.value.paymentDetails,
      isActive, isDeleted,this.insuranceForm.value.formBy)
      .subscribe(res =>{
        console.log("UpdateAddress",res);
        if(res.status){
          this.snackbar.open("Insurence Updated!",res.message,{
            duration:4000
          });
          this.isFromComplete = true;
          this.selectedIndex = 5;
          // this.dialogRef.close();
        }
    })
  }
}
