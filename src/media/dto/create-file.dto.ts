import { IsNotEmpty } from 'class-validator';
import { MediaType } from '../enums/media-type';

export class CreateFileDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  type: MediaType;
}
