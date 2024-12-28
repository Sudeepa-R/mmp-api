import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy,  } from "passport-jwt";
import { UserDetails } from "src/users/users.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly usermodule:Repository<UserDetails>
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRECT
        })
    }
    async validate(payload){
        const {id}=payload;
        const user=await this.usermodule.findOne(id)
        if(!user){
            throw new UnauthorizedException("Login first to access this endpoint!!")
        }
    }
}