import { Users } from './user-model';

export class ListIncomeResponse {
  submitDate: string;
  status: string;
  user: Users[];
}
