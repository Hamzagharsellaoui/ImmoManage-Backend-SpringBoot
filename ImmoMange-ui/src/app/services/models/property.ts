/* tslint:disable */
/* eslint-disable */
import { PropertyEquipments } from '../models/property-equipments';
import { PropertyImages } from '../models/property-images';
import { RentalContract } from '../models/rental-contract';
import { Tenant } from '../models/tenant';
import { User } from '../models/user';
export interface Property {
  address?: string;
  description?: string;
  id?: number;
  manager?: User;
  propertyEquipments?: Array<PropertyEquipments>;
  propertyImages?: Array<PropertyImages>;
  rentPrice?: number;
  rentalContracts?: Array<RentalContract>;
  status?: 'OCCUPIED' | 'AVAILABLE' | 'UNDER_MAINTENANCE';
  tenants?: Array<Tenant>;
}
