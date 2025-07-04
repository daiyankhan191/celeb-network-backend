import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { Fan } from '../fan/fan.entity';
import { Celebrity } from '../celebrity/celebrity.entity';
import { FanModule } from '../fan/fan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fan, Celebrity]), // 👈 Register repositories here
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultsecret',
      signOptions: { expiresIn: '7d' },
    }),
    FanModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
