import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { Celebrity } from '../celebrity/celebrity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Celebrity])],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
