import { Group } from 'src/groups/group.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SessionDate } from '../session-dates/sessiondate.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({ type: 'time' })
  startHour: string;

  @OneToMany(() => SessionDate, (sessionDate) => sessionDate.session, {
    cascade: true,
  })
  dates: SessionDate[];

  @ManyToOne(() => Group)
  @JoinColumn()
  group: Group;

  @Column()
  color: string;
}
