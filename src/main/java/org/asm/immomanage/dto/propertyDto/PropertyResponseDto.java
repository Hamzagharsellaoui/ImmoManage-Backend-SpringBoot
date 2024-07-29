package org.asm.immomanage.dto.propertyDto;

import lombok.Builder;
import org.asm.immomanage.dto.propertyEquipmentsDto.PropertyEquipmentDto;
import org.asm.immomanage.dto.propertyImagesDto.PropertyImageDto;
import org.asm.immomanage.models.*;

import java.util.List;
import java.util.Set;

@Builder
public record PropertyResponseDto(
        long id,
        double rentPrice,
        String description,
        String address,
        Property.Status status,
        List<PropertyEquipmentDto> propertyEquipmentDto,
        List<PropertyImageDto> propertyImages,
        Set<String> cinTenants,
        String managerEmail
        ){}




