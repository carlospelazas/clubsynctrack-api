import { User } from 'src/users/user.entity';
import { TeacherType } from '../enums/teacher-type';

export class TeacherDto {
  firstname: string;
  lastname: string;
  birthdate: string;
  type: TeacherType;
  salary: number;
  userId: string;
  telephone: string;
  user: User;
}
