import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{

    @IsNotEmpty({message:"User email should not be empty"})
    @IsEmail({},{message:'userEmail should not be empty'})
    userEmail:string

    @IsString()
    @IsNotEmpty({message:"user password is must"})
    password:string
}