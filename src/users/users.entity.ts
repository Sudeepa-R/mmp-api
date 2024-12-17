import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude, Expose } from "class-transformer";

@Entity({name:'usersDetails'})
export class UserDetails{
    @Exclude()
    @PrimaryGeneratedColumn({type:'int',name:'Id'})
    id:number

    @Exclude()
    @Column({name:'Name',type:'varchar',length:100,nullable:true})
    name:string

    @Exclude()
    @Column({name:'Email',type:'varchar',length:100,nullable:true})
    email:string
    
}