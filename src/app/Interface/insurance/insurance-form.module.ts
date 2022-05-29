export interface insuranceFormData {
    Date?:Date
    aadhaarNumber?:string
    address?:string
    contactOne?:number
    createdAt?:Date
    fullName?:string
    isActive?: boolean
    isDeleted?: boolean
    isVerified?: boolean
    mailId?: string
    mobileDetails?: any
    paymentDetails?: any
    uniqueId?: string
    userId?: string
    username?: string
    aadhaar_pic_front?: string
    aadhaar_pic_back?: string
    mobile_photo_front?: string
    mobile_photo_back?: string
    __v?: number
    _id?:string
    }

    export interface insuranceFormDataRes {
        status?: boolean
        message?: string
        success?: boolean
        errors:any
        _message:string
    }