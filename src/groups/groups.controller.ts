import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { TeachersService } from 'src/teachers/teachers.service';
import { Teacher } from 'src/teachers/teacher.entity';
import { GroupDto } from './dto/group.dto';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly teachersService: TeachersService,
  ) {}

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    const teachers: Teacher[] = [];
    for (let i = 0; i < createGroupDto.teachers.length; i++) {
      teachers.push(
        await this.teachersService.getTeacherById(createGroupDto.teachers[i]),
      );
    }
    const group: GroupDto = {
      ...createGroupDto,
      teachers,
    };
    return await this.groupsService.createGroup(group);
  }

  @Get()
  async getAllGroups(): Promise<Group[]> {
    return await this.groupsService.getAllGroups();
  }

  @Get(':id')
  async getGroupById(@Param('id') id: number): Promise<Group> {
    return await this.groupsService.getGroupById(id);
  }

  @Put(':id')
  async updateGroup(
    @Param('id') id: number,
    @Body() editGroup: CreateGroupDto,
  ): Promise<Group> {
    const teachers: Teacher[] = [];
    for (let i = 0; i < editGroup.teachers.length; i++) {
      teachers.push(
        await this.teachersService.getTeacherById(editGroup.teachers[i]),
      );
    }
    const group: GroupDto = {
      ...editGroup,
      teachers,
    };
    return await this.groupsService.updateGroup(id, group);
  }

  @Get('organization/:id')
  async getGroupsByOrganization(@Param('id') id: number): Promise<Group[]> {
    return await this.groupsService.getGroupsByOrganization(id);
  }
}
