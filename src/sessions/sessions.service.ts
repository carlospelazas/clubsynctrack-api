import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { SessionDto, SessionDto2 } from './dto/session.dto';
import { SessionDate } from '../session-dates/sessiondate.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,
    @InjectRepository(SessionDate)
    private readonly sessionsDateRepository: Repository<SessionDate>,
  ) {}

  async createSession(sessionDto: SessionDto2): Promise<Session> {
    const session = this.sessionsRepository.create(sessionDto);
    const result = await this.sessionsRepository.save(session);
    return result;
  }

  async getAllOrganizationSessions(organizationId: number): Promise<Session[]> {
    const qb: SelectQueryBuilder<Session> = this.sessionsRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.group', 'group')
      .leftJoinAndSelect('session.dates', 'dates')
      .leftJoinAndSelect('group.teachers', 'teacher')
      .leftJoinAndSelect('teacher.user', 'user')
      .leftJoinAndSelect('user.profilePicture', 'profilePicture')
      .leftJoinAndSelect('user.organization', 'organization')
      .where('organization.id = :organizationId', { organizationId });

    qb.select([
      'session',
      'group',
      'dates',
      'teacher',
      'user.id',
      'user.email',
      'user.role',
      'profilePicture',
      'organization',
    ]);

    return qb.getMany();
  }
  async getAllTeacherSessions(teacherId: number): Promise<Session[]> {
    return this.sessionsRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.group', 'group')
      .leftJoinAndSelect('session.dates', 'dates')
      .leftJoinAndSelect('group.teachers', 'teachers')
      .where('teachers.id = :teacherId', { teacherId })
      .getMany();
  }

  async deleteSession(sessionId: number): Promise<void> {
    const sessionDates = await this.sessionsDateRepository.find({
      relations: ['session'],
      where: { session: { id: sessionId } },
    });
    console.log(sessionDates);
    sessionDates.forEach((element) => {
      this.sessionsDateRepository.delete(element.id);
    });
    await this.sessionsRepository.delete(sessionId);
  }

  async updateSession(
    sessionId: number,
    sessionDto: SessionDto,
  ): Promise<Session> {
    //devolver tb el profilePicture
    const session = await this.sessionsRepository.findOne({
      where: { id: sessionId },
    });
    session.group = sessionDto.group;
    session.dates = sessionDto.dates;
    session.color = sessionDto.color;
    session.duration = sessionDto.duration;
    session.name = sessionDto.name;
    session.startHour = sessionDto.startHour;
    await this.sessionsRepository.save(session);
    return await this.sessionsRepository
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.group', 'group')
      .leftJoinAndSelect('session.dates', 'dates')
      .leftJoinAndSelect('group.teachers', 'teachers')
      .leftJoinAndSelect('teachers.user', 'user')
      .leftJoinAndSelect('user.profilePicture', 'profilePicture')
      .leftJoinAndSelect('user.organization', 'organization')
      .where('session.id = :sessionId', { sessionId })
      .getOne();
  }
}
