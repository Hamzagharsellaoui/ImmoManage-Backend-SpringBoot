/* tslint:disable */
/* eslint-disable */
import { Property } from '../models/property';
import { RentalContract } from '../models/rental-contract';
import { RentalHistory } from '../models/rental-history';
import { User } from '../models/user';
export interface Tenant {
  address?: string;
  cin?: string;
  email?: string;
  id?: number;
  manager?: User;
  name?: string;
  phoneNumber?: string;
  properties?: Array<Property>;
  rentalContracts?: Array<RentalContract>;
  rentalHistory?: RentalHistory;
}
