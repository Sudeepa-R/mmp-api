import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetails } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserDetails)
        private readonly userDetail:Repository<UserDetails>
    ){}

    async saveData(bulkData:UserDetails):Promise<UserDetails>{
        if(bulkData.id>0){
            const res=await this.userDetail.update({id:bulkData.id},bulkData)
            return this.getDataById(bulkData.id)
        }
        else{
            return await this.userDetail.save(bulkData);
    }   
    }

    async getDataById(id:number):Promise<UserDetails>{
        const res=await this.userDetail.findOneById(id);
        return res;
    }
}
