package org.asm.immomanage.dto.propertyDto;

import org.asm.immomanage.dto.propertyEquipmentsDto.PropertyEquipmentDto;
import org.asm.immomanage.dto.propertyImagesDto.PropertyImageDto;
import org.asm.immomanage.models.Property;

import java.util.List;

public record PropertyRequestDto(
        double rentPrice,
        String description,
        String address,
        Property.Status status,
        List<PropertyEquipmentDto> propertyEquipmentDto,
        List<PropertyImageDto> propertyImages,
        List<String> cinTenants,
        String managerEmail
) {}
