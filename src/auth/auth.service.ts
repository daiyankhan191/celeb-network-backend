import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Fan } from '../fan/fan.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Fan)
    private fanRepository: Repository<Fan>,
  ) {}
async signup(userData: { name: string; email: string; password: string }) {
  const hashed = await bcrypt.hash(userData.password, 10);
  const data = { ...userData, password: hashed };

  const fan = this.fanRepository.create(data); //
  await this.fanRepository.save(fan);

  const token = this.jwtService.sign({ id: fan.id });
  return { token, fan };
}


  async login(email: string, password: string) {
    const user = await this.fanRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user.id });
    return { token, fan: user };
  }
}
