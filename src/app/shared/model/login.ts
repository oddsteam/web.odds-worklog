import { User } from './user';

export interface Login {
    token: string;
    firstLogin: string;
    user: User;
}
