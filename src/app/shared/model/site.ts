import { User } from './user';

export class Site {
  id: string;
  name: string;
  color?: string;
}

export class ListSite {
  id: string;
  name: string;
  color?: string;
  length: string;
  users: User[];
}
export class Sites {
  sites: Site[];
}
