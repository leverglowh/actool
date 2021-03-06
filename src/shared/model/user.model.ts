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
  created_by?: IAdminUser;
  updated_at?: string;
  updated_by?: IAdminUser;
}

export interface IAdminUser {
  id?: number;
  firstname?: string;
  lastname?: string;
  username?: string;
}

export const defaultValue: Readonly<IUser> = {}
