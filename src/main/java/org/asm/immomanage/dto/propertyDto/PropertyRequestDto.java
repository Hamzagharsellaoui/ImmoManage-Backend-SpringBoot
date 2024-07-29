package org.asm.immomanage.dto.propertyDto;

import lombok.Builder;
import lombok.Data;
import org.asm.immomanage.dto.propertyEquipmentsDto.PropertyEquipmentDto;
import org.asm.immomanage.dto.propertyImagesDto.PropertyImageDto;
import org.asm.immomanage.models.Property;

import java.util.List;
import java.util.Set;

@Builder
public record PropertyRequestDto(
        double rentPrice,
        String description,
        String address,
        Property.Status status,
        List<PropertyEquipmentDto> propertyEquipmentDto,
        List<PropertyImageDto> propertyImages,
        Set<String> cinTenants,
        String managerEmail,
        List<Long> equipmentIdsToDelete,
        List<Long> imageIdsToDelete
) {

}
