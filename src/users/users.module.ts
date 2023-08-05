import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Organization } from 'src/organization/organization.entity';
import { MediaService } from 'src/media/media.service';
import { Media } from 'src/media/media.entity';

@Module({
  providers: [UsersService, MediaService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User, Media, Organization])],
  exports: [UsersService],
})
export class UsersModule {}
