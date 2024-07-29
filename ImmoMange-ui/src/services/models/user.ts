/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
import { Property } from '../models/property';
import { Tenant } from '../models/tenant';
export interface User {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authorities?: Array<GrantedAuthority>;
  credentialsNonExpired?: boolean;
  email?: string;
  enabled?: boolean;
  id?: number;
  managerTenants?: Array<Tenant>;
  name: string;
  password?: string;
  propertyList?: Array<Property>;
  username?: string;
}
