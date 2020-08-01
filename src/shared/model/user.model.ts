import { IRole } from './role.model';

export interface IUser {
  id?: number;
  username?: string;
  email?: string;
  provider?: string; // local if not from social
  role?: IRole;
  confirmed?: boolean;
  blocked?: boolean;
  created_at?: string;
  created_by?: string
  updated_at?: string;
  updated_by?: string;
}

export const defaultValue: Readonly<IUser> = {}
