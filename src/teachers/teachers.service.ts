import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { TeacherDto } from './dto/teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTeacher(teacher: TeacherDto): Promise<Teacher> {
    return this.teacherRepository.save(teacher);
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return this.teacherRepository.find({ relations: ['user'] });
  }

  async updateTeacher(id: number, teacher: TeacherDto): Promise<Teacher> {
    await this.teacherRepository.update(id, teacher);
    return this.teacherRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async getTeacherById(id: number): Promise<Teacher> {
    return this.teacherRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
}
