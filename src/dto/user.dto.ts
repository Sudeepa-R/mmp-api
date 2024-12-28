
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class UserDto{
    
    @IsOptional()
    @IsNumber()
    id:number

    @IsString()
    name:string


}

//   @Exclude()
//     @PrimaryGeneratedColumn({type:'int',name:'Id'})
//     id:number

//     @Exclude()
//     @Column({name:'Name',type:'varchar',length:100,nullable:true})
//     name:string

//     @Exclude()
//     @Column({name:'Email',type:'varchar',length:100,nullable:true})
//     email:string