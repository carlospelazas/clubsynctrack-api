import { Group } from 'src/groups/group.entity';

export class ClientDto {
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  birthdate: string;
  groups: Group[];
}
