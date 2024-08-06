/* tslint:disable */
/* eslint-disable */
import { PropertyEquipmentDto } from '../models/property-equipment-dto';
import { PropertyImageDto } from '../models/property-image-dto';
export interface PropertyResponseDto {
  address?: string;
  cinTenants?: Array<string>;
  description?: string;
  id?: number;
  managerEmail?: string;
  propertyEquipmentDto?: Array<PropertyEquipmentDto>;
  propertyNames?: Array<string>;
  rentPrice?: number;
  status?: 'OCCUPIED' | 'AVAILABLE' | 'UNDER_MAINTENANCE';
}
