/* tslint:disable */
/* eslint-disable */
import { PropertyEquipmentDto } from '../models/property-equipment-dto';
import { PropertyImageDto } from '../models/property-image-dto';
export interface PropertyRequestDto {
  address?: string;
  cinTenants?: Array<string>;
  description?: string;
  managerEmail?: string;
  propertyEquipmentDto?: Array<PropertyEquipmentDto>;
  propertyImages?: Array<PropertyImageDto>;
  rentPrice?: number;
  status?: 'OCCUPIED' | 'AVAILABLE' | 'UNDER_MAINTENANCE';
}
