package org.asm.immomanage.service;

import org.asm.immomanage.dto.propertyDto.PropertyRequestDto;
import org.asm.immomanage.dto.propertyDto.PropertyResponseDto;
import org.asm.immomanage.models.Property;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Component
public interface IPropertyService {
    PropertyResponseDto addPropertyService(PropertyRequestDto propertyRequestDto, MultipartFile[]file) throws IOException;
    PropertyResponseDto updatePropertyService(Long id, PropertyRequestDto propertyRequestDto);
    PropertyResponseDto getPropertyService(Long id);
    Optional<Property> verifyPropertyService(long id);
    void deletePropertyService(Long id);
    List<PropertyResponseDto> getAllProperties();

    Map<Long,String> getAllAvailableProperties();
}
