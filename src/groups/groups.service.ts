import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GroupDto } from './dto/group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  async createGroup(group: GroupDto): Promise<Group> {
    return this.groupsRepository.save(group);
  }

  async getAllGroups(): Promise<Group[]> {
    return this.groupsRepository.find({
      relations: ['teachers'],
    });
  }

  async getGroupById(id: number): Promise<Group> {
    return this.groupsRepository.findOne({
      where: { id },
      relations: ['teachers', 'teachers.user'],
    });
  }

  async updateGroup(id: number, group: GroupDto): Promise<Group> {
    const groupToUpdate = await this.groupsRepository.findOne({
      where: { id },
    });
    groupToUpdate.name = group.name;
    groupToUpdate.ageGroup = group.ageGroup;
    groupToUpdate.endDate = group.endDate;
    groupToUpdate.startDate = group.startDate;
    groupToUpdate.price = group.price;
    groupToUpdate.type = group.type;
    groupToUpdate.teachers = group.teachers;

    await this.groupsRepository.save(groupToUpdate);
    return this.groupsRepository.findOne({
      where: { id },
      relations: ['teachers'],
    });
  }

  async getGroupsByOrganization(id: number): Promise<Group[]> {
    const qb: SelectQueryBuilder<Group> = this.groupsRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.teachers', 'teacher')
      .leftJoinAndSelect('teacher.user', 'user')
      .leftJoinAndSelect('user.organization', 'organization')
      .where('organization.id = :id', { id });

    qb.select(['group']);

    return qb.getMany();
  }
}
