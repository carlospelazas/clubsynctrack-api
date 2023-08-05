import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const userId = parseInt(id, 10);
    return this.usersService.findOneById(userId);
  }
  @Post(':id/update-password')
  async updatePassword(
    @Param('id') id: string,
    @Body() password: UpdatePasswordDto,
  ): Promise<UserDto> {
    const userId = parseInt(id, 10);
    return this.usersService.updatePassword(userId, password);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<CreateUserDto> {
    console.log('hola');
    const userId = parseInt(id, 10);
    return this.usersService.updateUser(userId, user);
  }
}
