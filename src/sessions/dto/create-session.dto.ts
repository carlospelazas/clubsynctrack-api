import { CreateSessionDateDto } from './create-session-date.dto';

export class CreateSessionDto {
  name: string;
  duration: number;
  startHour: string;
  group: number;
  color: string;
  dates: CreateSessionDateDto[];
}
