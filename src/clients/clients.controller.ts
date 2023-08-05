import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './client.entity';
import { Group } from 'src/groups/group.entity';
import { GroupsService } from 'src/groups/groups.service';
import { ClientDto } from './dto/client.dto';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly groupsService: GroupsService,
  ) {}

  @Post()
  async createClient(
    @Body() createClientDto: CreateClientDto,
  ): Promise<Client> {
    const existingClient = await this.clientsService.findClientByEmail(
      createClientDto.email,
    );
    if (existingClient) {
      throw new ConflictException('Client already exists');
    }
    const assignedGroups: Group[] = [];
    for (let i = 0; i < createClientDto.groups.length; i++) {
      const group = await this.groupsService.getGroupById(
        createClientDto.groups[i],
      );
      if (!group) {
        throw new NotFoundException('Group not found');
      }
      console.log(group);
      assignedGroups.push(group);
    }
    const client: ClientDto = {
      ...createClientDto,
      groups: assignedGroups,
    };
    return this.clientsService.createClient(client);
  }

  @Get('organization/:id')
  async getAllOrganizationClients(
    @Param('id') orgId: number,
  ): Promise<Client[]> {
    return this.clientsService.getAllOrganizationClients(orgId);
  }

  @Put(':id')
  async updateClient(
    @Param('id') id: number,
    @Body() createClientDto: CreateClientDto,
  ) {
    const assignedGroups: Group[] = [];
    for (let i = 0; i < createClientDto.groups.length; i++) {
      const group = await this.groupsService.getGroupById(
        createClientDto.groups[i],
      );
      if (!group) {
        throw new NotFoundException('Group not found');
      }
      console.log(group);
      assignedGroups.push(group);
    }
    const client: ClientDto = {
      ...createClientDto,
      groups: assignedGroups,
    };
    return this.clientsService.updateClient(id, client);
  }

  @Get(':id')
  async getClientById(@Param('id') id: number): Promise<Client> {
    return this.clientsService.getClientById(id);
  }
}
