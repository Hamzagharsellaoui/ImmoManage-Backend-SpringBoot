package org.asm.immomanage.dto.propertyDto;

import lombok.Builder;
import org.asm.immomanage.dto.propertyEquipmentsDto.PropertyEquipmentDto;
import org.asm.immomanage.models.ImageModel;
import org.asm.immomanage.utils.Status;

import java.util.Set;

@Builder
public record PropertyRequestDto(
        double rentPrice,
        String description,
        String address,
        Status status,
        Set<PropertyEquipmentDto> propertyEquipmentDto,
        Set<ImageModel> propertyImages,
        Set<Long> tenantsIDS,
        Long managerID
) {
}
