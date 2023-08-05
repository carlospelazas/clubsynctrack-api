import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TeacherType } from './enums/teacher-type';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  salary: number;

  @Column({ type: 'enum', enum: TeacherType })
  type: TeacherType;

  @Column()
  birthdate: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  telephone: string;
}
