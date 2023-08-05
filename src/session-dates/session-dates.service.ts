import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionDate } from './sessiondate.entity';
import { Repository } from 'typeorm';
import { CreateSessionDateDto } from 'src/sessions/dto/create-session-date.dto';

@Injectable()
export class SessionDatesService {
  constructor(
    @InjectRepository(SessionDate)
    private readonly sessionDatesRepository: Repository<SessionDate>,
  ) {}

  async create(
    sessionDate: CreateSessionDateDto[],
    sessionId: number,
  ): Promise<SessionDate[]> {
    const dates: SessionDate[] = [];
    // tengo que asignarlo a su session
    const promises = sessionDate.map(async (date) => {
      const objectToStore = {
        ...date,
        session: { id: sessionId },
      };
      const objectInDatabase = await this.sessionDatesRepository.findOne({
        where: { date: date.date, session: { id: sessionId } },
      });
      let newDate;
      if (objectInDatabase) {
        newDate = await this.sessionDatesRepository.update(
          objectInDatabase.id,
          objectInDatabase,
        );
      }

      newDate = await this.sessionDatesRepository.save(objectToStore);
      await this.deleteUnusedObjects(); // garbage collector
      return newDate;
    });

    const resolvedDates = await Promise.all(promises);

    dates.push(...resolvedDates);
    return dates;
  }

  async getDatesByIds(ids: number[]): Promise<SessionDate[]> {
    const dates: SessionDate[] = [];
    ids.forEach(async (id) => {
      const date = await this.sessionDatesRepository.findOne({ where: { id } });
      dates.push(date);
    });
    return dates;
  }

  async deleteUnusedObjects(): Promise<void> {
    //find the objects with no session assigned

    const queryBuilder = this.sessionDatesRepository
      .createQueryBuilder('sessionDate')
      .leftJoinAndSelect('sessionDate.session', 'session')
      .where('sessionDate.session IS NULL');

    const result = await queryBuilder.getMany();

    result.forEach(async (object) => {
      await this.sessionDatesRepository.delete(object.id);
    });
  }
}
