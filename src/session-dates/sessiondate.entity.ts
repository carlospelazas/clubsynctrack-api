import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Session } from '../sessions/session.entity';

@Entity()
export class SessionDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @ManyToOne(() => Session, (session) => session.dates)
  session: Session;
}
