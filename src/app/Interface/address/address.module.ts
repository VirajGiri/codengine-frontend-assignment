export interface addressData {
BankName?: string
CountryName?: string
Location?: string
State?: string
Zip?: number
id?: string
City?:string
_id?:string
}

export interface addressRes {
    status: any
    message?:string
    success?:boolean
    data?:any,
    errors?:any,
    _message?:string
}