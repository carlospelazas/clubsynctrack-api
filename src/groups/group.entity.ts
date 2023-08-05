import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AgeGroup } from './enums/age-group.enum';
import { PaymentType } from './enums/payment-type.enum';
import { Teacher } from 'src/teachers/teacher.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: AgeGroup })
  ageGroup: AgeGroup;

  @Column({ type: 'enum', enum: PaymentType })
  type: PaymentType;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  price: number;

  @ManyToMany(() => Teacher)
  @JoinTable()
  teachers: Teacher[];
}
