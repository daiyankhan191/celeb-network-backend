// src/ai/ai.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('celeb-info')
  async getCelebrityInfo(@Body('name') name: string) {
    return this.aiService.suggestCelebrities(name);
  }
}
