import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UserResponse } from './types/UserResponse';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<{ accessToken: string }> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (!existingUser) {
      throw new UnauthorizedException('User not found!');
    }
    const isPasswordValid = await bcrypt.compare(
      user.password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password for this user!');
    }

    const payload = {
      username: existingUser.username,
      sub: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const a = await bcrypt.compare(password, user.password);
    if (user && a) {
      return user;
    }
    return null;
  }

  async getMe(id: number): Promise<UserResponse> {
    const user = await this.usersService.findOneById(id);
    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
      organization: user.organization,
    };
    return userResponse;
  }
}
