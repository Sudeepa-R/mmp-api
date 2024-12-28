import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtStrategyService } from "./jwt-strategy/jwt-strategy.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "src/users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDetails } from "src/users/users.entity";
import * as dotenv from 'dotenv';
dotenv.config()


@Module({
    imports:[
        PassportModule,
        TypeOrmModule.forFeature([UserDetails]),
        JwtModule.register({
            secret:process.env.MMP_SECRET,
            signOptions:{expiresIn:'1h'},
        })
    ],
    providers:[AuthService,JwtStrategyService, UsersService],
    controllers:[AuthController],
    exports:[AuthService,UsersService]
})
export class AuthModule{}