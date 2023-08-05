import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { GroupsService } from 'src/groups/groups.service';
import { Group } from 'src/groups/group.entity';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, GroupsService],
  imports: [TypeOrmModule.forFeature([Client, Group])],
})
export class ClientsModule {}
