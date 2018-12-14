import { User } from './user';

export class Site {
  id: string;
  name: string;
}

export class ListSite {
  id: string;
  name: string;
  length: string;
  users: User[];
}
export class Sites {
  sites: Site[];
}
