import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDetails } from 'src/users/users.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MMP-Auth')
@Controller('MMP-Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userData: UserDetails): Promise<object> {
    const isPasswordValid = await this.authService.validateUser(
      userData.email,
      userData.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid creadentials');
    }
    const token = await this.authService.generateToken(userData);
    return { token: token };
  }
}
