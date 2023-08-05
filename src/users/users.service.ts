import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Organization } from 'src/organization/organization.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Media } from 'src/media/media.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async create(newUser: CreateUserDto): Promise<User> {
    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    //check if organization exists
    const organizationId = parseInt(newUser.organizationId);
    const organization = await this.organizationRepository.findOne({
      where: { id: organizationId },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    //check if user already exists by email
    const existingEmail = await this.userRepository.findOne({
      where: { email: newUser.email },
    });
    if (existingEmail) {
      throw new ConflictException('User already exists');
    }
    const user = this.userRepository.create({
      username: newUser.username,
      password: hashedPassword,
      organization: organization,
      email: newUser.email,
      role: newUser.role,
    });
    return this.userRepository.save(user);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profilePicture', 'organization'],
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map(({ id, username }) => ({ id, username }));
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updatePassword(userId: number, newPassword: UpdatePasswordDto) {
    const hashedPassword = await bcrypt.hash(newPassword.password, 10);
    await this.userRepository.update(userId, { password: hashedPassword });
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async updateUser(
    userId: number,
    newUser: UpdateUserDto,
  ): Promise<CreateUserDto> {
    const organizationId = parseInt(newUser.organizationId);
    const organization = await this.organizationRepository.findOne({
      where: { id: organizationId },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found!');
    }
    const profilePicture = await this.mediaRepository.findOne({
      where: { id: newUser.profilePictureId },
    });

    await this.userRepository.update(userId, {
      username: newUser.username,
      organization: organization,
      email: newUser.email,
      role: newUser.role,
      profilePicture: profilePicture,
    });
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ['profilePicture'],
    });
  }
}
