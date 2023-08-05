import { Organization } from 'src/organization/organization.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserRole } from './enums/user-role';
import { Media } from 'src/media/media.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Organization, (organization) => organization.users)
  @JoinColumn({ name: 'organizationId' })
  organization?: Organization | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.TEACHER })
  role: UserRole;

  @Column({ nullable: true })
  email: string;

  @ManyToOne(() => Media, { nullable: true })
  @JoinColumn({ name: 'profilePictureId' })
  profilePicture?: Media | null;
}
