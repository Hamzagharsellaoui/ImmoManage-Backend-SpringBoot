package org.asm.immomanage.mappers;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.asm.immomanage.dto.propertyImagesDto.PropertyImageDto;
import org.asm.immomanage.models.PropertyImages;
import org.asm.immomanage.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class PropertyImagesDtoMapper {
    private final PropertyRepository propertyRepository;

    public  List<PropertyImageDto> toPropertyImagesDtos(List<PropertyImages> propertyImages) {
        if(propertyImages==null || propertyImages.isEmpty()){
            return Collections.emptyList();
        }
        return propertyImages.stream()
                .map(image -> new PropertyImageDto(
                        image.getImageUrl(),
                        image.getProperty().getId(),
                        image.getProperty().getAddress()))
                .toList();
    }

    public List<PropertyImages> toPropertyImages(List<PropertyImageDto> propertyImageDtos) {
        if(propertyImageDtos==null || propertyImageDtos.isEmpty()){
            return Collections.emptyList();
        }
        return propertyImageDtos.stream()
                .map(this::toPropertyImage)
                .toList();
    }

    public PropertyImages toPropertyImage(@NotNull PropertyImageDto propertyImageDto) {
        return PropertyImages.builder()
                .imageUrl(propertyImageDto.imageUrl())
                .build();
    }
}
