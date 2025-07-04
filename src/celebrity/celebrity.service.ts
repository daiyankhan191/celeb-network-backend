import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Celebrity } from './celebrity.entity';
import { CreateCelebrityDto } from './dto/create-celebrity.dto';
import { UpdateCelebrityDto } from './dto/update-celebrity.dto';

@Injectable()
export class CelebrityService {
  constructor(
    @InjectRepository(Celebrity)
    private readonly celebrityRepo: Repository<Celebrity>,
  ) {}

  create(data: CreateCelebrityDto) {
    const celeb = this.celebrityRepo.create(data);
    return this.celebrityRepo.save(celeb);
  }

  findAll() {
    return this.celebrityRepo.find();
  }

  findOne(id: number) {
    return this.celebrityRepo.findOne({ where: { id } });
  }

  update(id: number, data: UpdateCelebrityDto) {
    return this.celebrityRepo.update(id, data);
  }

  delete(id: number) {
    return this.celebrityRepo.delete(id);
  }
}
