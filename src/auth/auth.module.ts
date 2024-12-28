import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.startergy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetails } from 'src/users/users.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([UserDetails]),
        PassportModule,
        JwtModule.register({
            secret:process.env.JWT_SECRECT,
            signOptions:{expiresIn:'60s'}
        })
    ],
    providers:[AuthService,JwtStrategy],
    exports:[AuthService],
})
export class AuthModule {}
