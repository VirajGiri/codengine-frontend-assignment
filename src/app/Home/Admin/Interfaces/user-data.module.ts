export interface UserData {
    Name?:string,
    Email?:string,
    Role?:string,
    username?:string,
    password?:string,
    AssignEnquiry?:string,
    CompletedEnquiry?:string,
    Address?:string,
    City?:string,
    State?:string,
    MobileNo?:string,
    Landmark?:string,
    Zip?:string,
    isActive?:Boolean,
    created_by?:string,
    created_by_id?:string,
}
export interface UserDataRes {
    status?: boolean
    message?: string
    success?: boolean
    errors:any
    _message:string
}