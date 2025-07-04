import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Celebrity } from './celebrity.entity';
import { CelebrityService } from './celebrity.service';
import { CelebrityController } from './celebrity.controller';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Celebrity]), AiModule],
  providers: [CelebrityService],
  controllers: [CelebrityController],
})
export class CelebrityModule {}
