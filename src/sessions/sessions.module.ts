import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { SessionDate } from '../session-dates/sessiondate.entity';
import { GroupsService } from 'src/groups/groups.service';
import { Group } from 'src/groups/group.entity';
import { SessionDatesService } from 'src/session-dates/session-dates.service';
import { SessionDatesModule } from 'src/session-dates/session-dates.module';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, GroupsService, SessionDatesService],
  imports: [
    TypeOrmModule.forFeature([Session, SessionDate, Group]),
    SessionDatesModule,
  ],
})
export class SessionsModule {}
