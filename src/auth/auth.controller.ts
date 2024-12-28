import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @Get('/Login')
    async Login(userData:LoginDto):Promise<{token:string}>{
        return await this.authService.login(userData)
    }

   
}
