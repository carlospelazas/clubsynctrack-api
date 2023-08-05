import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { GroupsService } from 'src/groups/groups.service';
import { SessionDto, SessionDto2 } from './dto/session.dto';
import { Session } from './session.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { SessionDatesService } from 'src/session-dates/session-dates.service';
import { EditSessionDto } from './dto/edit-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly groupsService: GroupsService,
    private readonly sessionDatesService: SessionDatesService,
  ) {}

  @Post()
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<Session> {
    // turn createSessionDto into a sessiondto
    const groupId = createSessionDto.group;
    const group = await this.groupsService.getGroupById(groupId);
    const sessionDto: SessionDto2 = {
      ...createSessionDto,
      group: group,
    };
    // pass it to service and return
    const result = await this.sessionsService.createSession(sessionDto);
    this.sessionDatesService.deleteUnusedObjects();
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('organization/:id')
  async getOrganizationSessions(@Param('id') id: number): Promise<Session[]> {
    return this.sessionsService.getAllOrganizationSessions(id);
  }
  @Get('teacher/:id')
  async getTeacherSessions(@Param('id') id: number): Promise<Session[]> {
    return this.sessionsService.getAllTeacherSessions(id);
  }

  @Delete(':id')
  async deleteSession(@Param('id') id: number): Promise<void> {
    return this.sessionsService.deleteSession(id);
  }

  @Put(':id')
  async editSession(
    @Param('id') id: number,
    @Body() session: EditSessionDto,
  ): Promise<Session> {
    const groupId = session.group;
    const group = await this.groupsService.getGroupById(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    const sessionDates = await this.sessionDatesService.create(
      session.dates,
      id,
    );
    const sessionDto: SessionDto = {
      ...session,
      group: group,
      dates: sessionDates,
    };
    return await this.sessionsService.updateSession(id, sessionDto);
  }
}
