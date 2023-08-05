import { Module } from '@nestjs/common';
import { SessionDatesService } from './session-dates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionDate } from './sessiondate.entity';
import { SessionDatesController } from './session-dates.controller';

@Module({
  providers: [SessionDatesService],
  imports: [TypeOrmModule.forFeature([SessionDate])],
  exports: [SessionDatesService],
  controllers: [SessionDatesController],
})
export class SessionDatesModule {}
