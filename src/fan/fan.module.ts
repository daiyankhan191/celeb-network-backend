import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fan } from './fan.entity';
import { Celebrity } from '../celebrity/celebrity.entity';
import { FanService } from './fan.service';
import { FanController } from './fan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fan, Celebrity])],
  providers: [FanService],
  controllers: [FanController],
})
export class FanModule {}
