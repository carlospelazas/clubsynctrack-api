import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async create(createFileDto: CreateFileDto) {
    const newFile = this.mediaRepository.create(createFileDto);
    await this.mediaRepository.save(newFile);
    return newFile;
  }
}
