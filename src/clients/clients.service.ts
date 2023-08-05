import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { ClientDto } from './dto/client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async createClient(client: ClientDto): Promise<Client> {
    return this.clientsRepository.save(client);
  }

  async findClientByEmail(email: string): Promise<Client> {
    return this.clientsRepository.findOne({ where: { email } });
  }

  async getAllOrganizationClients(organizationId: number): Promise<Client[]> {
    return this.clientsRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.groups', 'group')
      .leftJoinAndSelect('group.teachers', 'teacher')
      .leftJoinAndSelect('teacher.user', 'user')
      .leftJoinAndSelect('user.organization', 'organization')
      .where('organization.id = :organizationId', { organizationId })
      .getMany();
  }

  async updateClient(id: number, client: ClientDto): Promise<Client> {
    const clientToUpdate = await this.clientsRepository.findOne({
      where: { id },
    });
    clientToUpdate.firstname = client.firstname;
    clientToUpdate.lastname = client.lastname;
    clientToUpdate.email = client.email;
    clientToUpdate.birthdate = client.birthdate;
    clientToUpdate.telephone = client.telephone;
    clientToUpdate.groups = client.groups;

    await this.clientsRepository.save(clientToUpdate);
    return this.clientsRepository.findOne({ where: { id } });
  }

  async getClientById(id: number): Promise<Client> {
    return this.clientsRepository.findOne({
      where: { id },
      relations: ['groups'],
    });
  }
}
