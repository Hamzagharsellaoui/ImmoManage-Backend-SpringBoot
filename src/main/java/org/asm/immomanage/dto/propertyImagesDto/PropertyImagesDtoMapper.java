package org.asm.immomanage.dto.propertyImagesDto;

import org.asm.immomanage.models.PropertyImages;

import java.util.List;

public class PropertyImagesDtoMapper {
    private PropertyImagesDtoMapper(){}
    public static List<PropertyImageDto> toPropertyImagesDto(List<PropertyImages> propertyImages) {
        return propertyImages.stream()
                .map(equipment -> new PropertyImageDto(equipment.getImageUrl()))
                .toList();
    }
}
