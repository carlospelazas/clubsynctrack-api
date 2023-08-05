import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageConfig } from './storage.config';
import { MediaType } from './enums/media-type';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', StorageConfig()))
  async uploadFile(@UploadedFile() file) {
    console.log(file);
    const media = await this.mediaService.create({
      url: file.path,
      key: file.filename,
      type: MediaType.Image,
    });
    return media;
  }
}
