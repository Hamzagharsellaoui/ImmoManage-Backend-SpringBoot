/* tslint:disable */
/* eslint-disable */
import { Property } from '../models/property';
import { Tenant } from '../models/tenant';
export interface RentalContract {
  endDate?: string;
  id?: number;
  monthlyRent?: number;
  property?: Property;
  startDate?: string;
  tenantC?: Tenant;
  terms?: string;
}
