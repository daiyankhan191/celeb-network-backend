import { Controller, Get, Post, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { FanService } from './fan.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('fan')
export class FanController {
  constructor(private readonly fanService: FanService) {}

  @Get('dashboard')
  getDashboard(@Request() req) {
    return this.fanService.getDashboard(req.user.id);
  }

  @Post('follow/:id')
  follow(@Request() req, @Param('id') celebId: string) {
    return this.fanService.followCelebrity(req.user.id, +celebId);
  }

  @Delete('unfollow/:id')
  unfollow(@Request() req, @Param('id') celebId: string) {
    return this.fanService.unfollowCelebrity(req.user.id, +celebId);
  }
}
