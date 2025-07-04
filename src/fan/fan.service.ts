import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fan } from './fan.entity';
import { Celebrity } from '../celebrity/celebrity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FanService {
  constructor(
    @InjectRepository(Fan) private fanRepo: Repository<Fan>,
    @InjectRepository(Celebrity) private celebRepo: Repository<Celebrity>,
  ) {}

  async getDashboard(id: number) {
    const fan = await this.fanRepo.findOne({
      where: { id },
      relations: ['following'],
    });
    if (!fan) throw new NotFoundException('Fan not found');
    return fan.following;
  }

  async followCelebrity(fanId: number, celebId: number) {
    const fan = await this.fanRepo.findOne({ where: { id: fanId }, relations: ['following'] });
    const celeb = await this.celebRepo.findOne({ where: { id: celebId } });
    if (!fan || !celeb) throw new NotFoundException();

    fan.following.push(celeb);
    await this.fanRepo.save(fan);
    return { message: 'Followed successfully' };
  }

  async unfollowCelebrity(fanId: number, celebId: number) {
    const fan = await this.fanRepo.findOne({ where: { id: fanId }, relations: ['following'] });
    if (!fan) throw new NotFoundException();

    fan.following = fan.following.filter((c) => c.id !== celebId);
    await this.fanRepo.save(fan);
    return { message: 'Unfollowed successfully' };
  }
}
