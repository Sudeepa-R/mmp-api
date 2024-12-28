import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserDetails } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config()


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.MMP_DB_HOST,
      port:23908,
      username:process.env.MMP_DB_USERNAME,
      password:process.env.MMP_DB_PASSWORD,
      entities:[UserDetails],
      synchronize:true,
      database:process.env.MMP_DATABSE,
      
      ssl: {
        rejectUnauthorized: false
      }
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
