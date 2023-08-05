import { Group } from 'src/groups/group.entity';
import { SessionDate } from 'src/session-dates/sessiondate.entity';
import { CreateSessionDateDto } from './create-session-date.dto';

export class SessionDto {
  duration: number;
  startHour: string;
  group: Group;
  color: string;
  dates: SessionDate[];
  name: string;
}

export class SessionDto2 {
  duration: number;
  startHour: string;
  group: Group;
  color: string;
  dates: CreateSessionDateDto[];
  name: string;
}
