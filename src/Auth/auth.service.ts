import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDetails } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userServices: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const userData = await this.userServices.getUserByEmail(email);
    return await bcrypt.compare(password, userData.password);
  }

  async generateToken(user: UserDetails): Promise<string> {
    const usetCredentials = { userName: user.email, password: user.password };
    return this.jwtService.sign(usetCredentials);
  }
}
