import { Media } from 'src/media/media.entity';
import { UserRole } from 'src/users/enums/user-role';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  profilePicture: Media | null;
  organization: OrganizationResponse;
}
export interface OrganizationResponse {
  id: number;
  name: string;
}
