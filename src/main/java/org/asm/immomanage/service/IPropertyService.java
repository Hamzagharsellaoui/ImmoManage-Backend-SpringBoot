package org.asm.immomanage.service;

import org.asm.immomanage.dto.propertyDto.PropertyResponseDto;
import org.asm.immomanage.models.Property;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
@Component
public interface IPropertyService {
    PropertyResponseDto addPropertyService(PropertyResponseDto propertyResponseDto);
    PropertyResponseDto updatePropertyService(Long id, PropertyResponseDto propertyResponseDto);
    PropertyResponseDto getPropertyService(Long id);
    Optional<Property> verifyPropertyService(String address);
    void deletePropertyService(Long id);
    List<PropertyResponseDto> getAllProperties();
}
