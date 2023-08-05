import { AgeGroup } from '../enums/age-group.enum';
import { PaymentType } from '../enums/payment-type.enum';

export class CreateGroupDto {
  name: string;
  ageGroup: AgeGroup;
  type: PaymentType;
  startDate: string;
  endDate: string;
  price: number;
  teachers: number[];
}
