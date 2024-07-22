package org.asm.immomanage.service;

import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.propertyDto.PropertyResponseDto;
import org.asm.immomanage.dto.propertyDto.PropertyDtoMapper;
import org.asm.immomanage.exception.NoPropertiesFoundException;
import org.asm.immomanage.models.Property;
import org.asm.immomanage.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Builder
@Service
@RequiredArgsConstructor
public class PropertyService implements IPropertyService {
    private final PropertyRepository propertyRepository;
    private final PropertyDtoMapper propertyDtoMapper;

    @Override
    public PropertyResponseDto addPropertyService(PropertyResponseDto propertyResponseDto) {
        Property property = propertyDtoMapper.toProperty(propertyResponseDto);
        Property savedProperty = propertyRepository.save(property);
        return propertyDtoMapper.toPropertyDto(savedProperty);
    }

    @Override
    public PropertyResponseDto updatePropertyService(Long id, PropertyResponseDto propertyResponseDto) {
        Optional<Property> optionalProperty = propertyRepository.findById(id);

        if (optionalProperty.isPresent()) {
            Property property = optionalProperty.get();
            property.setRentPrice(propertyResponseDto.rentPrice());
            property.setDescription(propertyResponseDto.description());
            property.setAddress(propertyResponseDto.address());
            property.setStatus(propertyResponseDto.status() != null ? propertyResponseDto.status() : Property.Status.AVAILABLE);
            property.setPropertyImages(propertyDtoMapper.convertImages(propertyResponseDto.propertyImages()));
            property.setPropertyEquipments(propertyDtoMapper.convertEquipments(propertyResponseDto.propertyEquipmentDto()));
            property.setTenants(propertyDtoMapper.convertTenants(propertyResponseDto.cinTenants()));
            Property updatedProperty = propertyRepository.save(property);
            return propertyDtoMapper.toPropertyDto(updatedProperty);
        }
        return null;
    }

    @Override
    public PropertyResponseDto getPropertyService(Long id) {
        Optional<Property> propertyOptional = propertyRepository.findById(id);
        return propertyOptional.map(propertyDtoMapper::toPropertyDto).orElse(null);
    }

    public Optional<Property> verifyPropertyService(String address) {
        return propertyRepository.findByAddress(address);
    }

    public void deletePropertyService(Long id) {
        Optional<Property> propertyOptional = propertyRepository.findById(id);
        propertyOptional.ifPresent(propertyRepository::delete);
    }

    @Override


    public List<PropertyResponseDto> getAllProperties() {
        List<Property> properties = propertyRepository.findAll(); // Assuming this returns a List

        if (properties.isEmpty()) {
            throw new NoPropertiesFoundException("No properties found");
        }
        return properties.stream().map(PropertyDtoMapper::toPropertyResponseDto).toList();
    }
}
