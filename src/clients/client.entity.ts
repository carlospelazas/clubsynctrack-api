import { Group } from 'src/groups/group.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column()
  birthdate: string;

  @ManyToMany(() => Group)
  @JoinTable()
  groups: Group[];
}
