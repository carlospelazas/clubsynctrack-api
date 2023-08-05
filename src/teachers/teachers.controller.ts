import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Teacher } from './teacher.entity';
import { UsersService } from 'src/users/users.service';
import { TeacherDto } from './dto/teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async createTeacher(
    @Body() createTeacherDto: CreateTeacherDto,
  ): Promise<Teacher> {
    const userId = parseInt(createTeacherDto.userId, 10);
    const user = await this.usersService.findOneById(userId);
    const teacher: TeacherDto = {
      ...createTeacherDto,
      user: user,
    };
    return this.teachersService.createTeacher(teacher);
  }
  @Get()
  async findAllTeachers(): Promise<Teacher[]> {
    return this.teachersService.getAllTeachers();
  }

  @Put(':id')
  async updateTeacher(@Param('id') id: number, @Body() teacher: TeacherDto) {
    return this.teachersService.updateTeacher(id, teacher);
  }

  @Get(':id')
  async findTeacherById(@Param('id') id: number): Promise<Teacher> {
    return this.teachersService.getTeacherById(id);
  }
}
