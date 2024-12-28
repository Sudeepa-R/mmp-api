import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetails } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import e from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserDetails)
    private readonly userDetail: Repository<UserDetails>,
  ) {}

  async saveData(bulkData: UserDetails): Promise<UserDetails> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(bulkData.password, saltRounds);
    const userData = this.userDetail.create({
      ...bulkData,
      password: hashedPassword,
    });
    if (bulkData.id > 0) {
      const res = await this.userDetail.update({ id: userData.id }, userData);
      return this.getDataById(userData.id);
    } else {
      return await this.userDetail.save(userData);
    }
  }

  async getDataById(id: number): Promise<UserDetails> {
    const res = await this.userDetail.findOneById(id);
    return res;
  }

  async getUserByEmail(email: string): Promise<UserDetails> {
    return await this.userDetail.findOne({ where: { email } });
  }
}
