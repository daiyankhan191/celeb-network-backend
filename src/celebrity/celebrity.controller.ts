import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Inject,
} from '@nestjs/common';
import { CelebrityService } from './celebrity.service';
import { CreateCelebrityDto } from './dto/create-celebrity.dto';
import { UpdateCelebrityDto } from './dto/update-celebrity.dto';
import { AiService } from '../ai/ai.service';


@Controller('celebrities')
export class CelebrityController {
  constructor(
    private readonly celebrityService: CelebrityService,
    private readonly aiService: AiService,
  ) {}

  @Post()
  create(@Body() dto: CreateCelebrityDto) {
    return this.celebrityService.create(dto);
  }

  @Get()
  findAll() {
    return this.celebrityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.celebrityService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCelebrityDto) {
    return this.celebrityService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.celebrityService.delete(+id);
  }

  @Post('suggest')
  suggestFromAI(@Body('intro') intro: string) {
    return this.aiService.suggestCelebrities(intro);
  }
}
