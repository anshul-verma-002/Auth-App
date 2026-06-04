export default interface User{
    id:string,
    email:string,
    specialName:string,
    bio:string,
    name?:string,
    enable:boolean,
    image?:string,
    updatedAt?:string,
    createdAt?:string,
    provider:string
}