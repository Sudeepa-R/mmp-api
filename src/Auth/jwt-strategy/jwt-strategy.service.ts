import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDetails } from 'src/users/users.entity';
import * as dotenv from 'dotenv';
dotenv.config()

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.MMP_SECRET,
        });
    }
    async validate(user:UserDetails){
        return {userName:user.email,password:user.password};
    }
}
