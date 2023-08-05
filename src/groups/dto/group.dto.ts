import { Teacher } from 'src/teachers/teacher.entity';
import { PaymentType } from '../enums/payment-type.enum';
import { AgeGroup } from '../enums/age-group.enum';

export class GroupDto {
  name: string;
  ageGroup: AgeGroup;
  type: PaymentType;
  startDate: string;
  endDate: string;
  price: number;
  teachers: Teacher[];
}
