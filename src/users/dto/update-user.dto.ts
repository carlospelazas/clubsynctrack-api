import { UserRole } from '../enums/user-role';

export class UpdateUserDto {
  username: string;
  email: string;
  role: UserRole;
  organizationId: string;
  profilePictureId: number;
}
