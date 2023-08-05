import { CreateSessionDateDto } from './create-session-date.dto';

export class EditSessionDto {
  name: string;
  duration: number;
  startHour: string;
  group: number;
  color: string;
  dates: CreateSessionDateDto[];
}
