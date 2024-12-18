import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDetails } from './users.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserDetails> {
    return await this.userServices.getDataById(id);
  }

  @Post()
  async saveUsers(@Body() userData: UserDetails): Promise<UserDetails> {
    return this.userServices.saveData(userData);
  }
}
