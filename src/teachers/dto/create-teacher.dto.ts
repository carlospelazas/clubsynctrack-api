import { TeacherType } from '../enums/teacher-type';

export class CreateTeacherDto {
  firstname: string;
  lastname: string;
  birthdate: string;
  type: TeacherType;
  salary: number;
  userId: string;
  telephone: string;
}
