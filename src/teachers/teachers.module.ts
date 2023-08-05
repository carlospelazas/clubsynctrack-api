import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Organization } from 'src/organization/organization.entity';
import { Media } from 'src/media/media.entity';
import { MediaService } from 'src/media/media.service';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService, UsersService, MediaService],
  imports: [TypeOrmModule.forFeature([Teacher, User, Organization, Media])],
  exports: [TeachersService],
})
export class TeachersModule {}
