import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import { TeachersService } from 'src/teachers/teachers.service';
import { User } from 'src/users/user.entity';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, TeachersService],
  imports: [TypeOrmModule.forFeature([Group, Teacher, User])],
  exports: [GroupsService],
})
export class GroupsModule {}
