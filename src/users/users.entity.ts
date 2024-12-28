import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude, Expose } from "class-transformer";

@Entity({name:'usersDetails'})
export class UserDetails{
    @Exclude()
    @PrimaryGeneratedColumn({type:'int',name:'Id'})
    id:number

    @Exclude()
    @Column({name:'FirstName',type:'varchar',length:100,nullable:true})
    firstName:string

    @Exclude()
    @Column({name:'UserEmail',type:'varchar',length:100,nullable:true})
    userEmail:string

    @Exclude()
    @Column({name:'Password',type:'varchar',length:50,nullable:true})
    password:string
    
}