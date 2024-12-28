import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserDetails } from 'src/users/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly loginDto:Repository<UserDetails>,
        private readonly jwtService: JwtService){}

   async login(userData:LoginDto):Promise<{token:string}>{
    const user=await this.loginDto.findOneById(userData.userEmail)
    if(!user){
        throw new UnauthorizedException("Invalid email or password !!")
    }
   const passMatch=await bcrypt.compare(userData.password,user.password)
   if(!passMatch){
    throw new UnauthorizedException("Invalid email or Password")
   }
   const token=this.jwtService.sign(userData)
   return {token}
    
   }
}
