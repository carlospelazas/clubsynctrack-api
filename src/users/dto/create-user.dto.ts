import { Media } from 'src/media/media.entity';
import { UserRole } from '../enums/user-role';

export class CreateUserDto {
  username: string;
  email: string;
  organizationId?: string;
  role: UserRole;
  profilePicture?: Media;
}
