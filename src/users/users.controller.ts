import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDetails } from './users.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserDetails> {
    return await this.userServices.getDataById(id);
  }

  @Post()
  async saveUsers(@Body() userData: UserDetails): Promise<UserDetails> {
    if (!userData.password || !userData.email) {
      throw new BadRequestException('Email and password are required');
  }
    return this.userServices.saveData(userData);
  }

  @Get("email/:Email")
  async getUserByEmail(@Param('email') email:string):Promise<UserDetails>{
    return this.userServices.getUserByEmail(email)
  }

}
