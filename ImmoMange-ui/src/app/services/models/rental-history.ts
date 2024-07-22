/* tslint:disable */
/* eslint-disable */
import { Property } from '../models/property';
import { Tenant } from '../models/tenant';
export interface RentalHistory {
  endDate?: string;
  id?: number;
  property?: Property;
  reasonForLeaving?: string;
  startDate?: string;
  tenant?: Tenant;
  wasEvicted?: boolean;
}
