package org.asm.immomanage.service;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.propertyDto.PropertyRequestDto;
import org.asm.immomanage.dto.propertyDto.PropertyResponseDto;

import org.asm.immomanage.exception.PropertyAlreadyExistsException;
import org.asm.immomanage.mappers.PropertyDtoMapper;
import org.asm.immomanage.exception.NoPropertiesFoundException;
import org.asm.immomanage.mappers.PropertyEquipmentDtoMapper;
import org.asm.immomanage.mappers.PropertyImagesDtoMapper;
import org.asm.immomanage.models.Property;
import org.asm.immomanage.models.PropertyEquipments;
import org.asm.immomanage.models.PropertyImages;
import org.asm.immomanage.models.Tenant;
import org.asm.immomanage.repository.PropertyRepository;
import org.asm.immomanage.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Builder
@Service
@RequiredArgsConstructor
public class PropertyService implements IPropertyService {
    private final PropertyRepository propertyRepository;
    private final PropertyDtoMapper propertyDtoMapper;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PropertyEquipmentDtoMapper propertyEquipmentDtoMapper;
    private final PropertyImagesDtoMapper propertyImagesDtoMapper;


    @Override
    public PropertyResponseDto addPropertyService(@NotNull PropertyRequestDto propertyRequestDto) {
        Optional<Property> existingProperty = propertyRepository.findByAddress(propertyRequestDto.address());
        if (existingProperty.isPresent()) {
            throw new PropertyAlreadyExistsException("Property already exists with address: " + propertyRequestDto.address());
        }
        Property property = propertyDtoMapper.toProperty(propertyRequestDto);
        Property savedProperty = propertyRepository.save(property);
        return propertyDtoMapper.toPropertyResponseDto(savedProperty);
    }
    @Override
    public PropertyResponseDto updatePropertyService(Long id, PropertyRequestDto propertyRequestDto)    {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Property not found with id " + id));
        property.setRentPrice(propertyRequestDto.rentPrice());
        property.setDescription(propertyRequestDto.description());
        property.setAddress(propertyRequestDto.address());
        property.setStatus(Optional.ofNullable(propertyRequestDto.status()).orElse(Property.Status.AVAILABLE));

        Set<Tenant> updatedTenants = propertyDtoMapper.IdsToTenants(propertyRequestDto.tenantsIDS());
        for (Tenant tenant : updatedTenants) {
            property.addTenant(tenant);
            tenant.addProperty(property);
        }
        List<PropertyImages> updatedImages = propertyImagesDtoMapper.toPropertyImages(propertyRequestDto.propertyImages());
        for (PropertyImages image : updatedImages) {
            image.setProperty(property);
            property.getPropertyImages().add(image);
        }
        List<PropertyEquipments> updatedEquipments = propertyEquipmentDtoMapper.toPropertyEquipments(propertyRequestDto.propertyEquipmentDto());
        for (PropertyEquipments equipment : updatedEquipments) {
            equipment.setProperty(property);
            property.getPropertyEquipments().add(equipment);
        }
        property = propertyRepository.save(property);
        return propertyDtoMapper.toPropertyResponseDto(property);
    }
    @Override
    public PropertyResponseDto getPropertyService(Long id) {
        Optional<Property> propertyOptional = propertyRepository.findById(id);
        return propertyOptional.map(propertyDtoMapper::toPropertyResponseDto).orElse(null);
    }
    public Optional<Property> verifyPropertyService(long id) {
        return propertyRepository.findById(id);
    }
    public void deletePropertyService(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found with id: " + id));
        property.getPropertyImages().remove(property);
        property.getPropertyEquipments().remove(property);
        property.getTenants().forEach(
                tenant -> {
                    tenant.getProperties().remove(property);
                    if(tenant.getIdActualProperty()==id){
                        tenant.setIdActualProperty(-1);
                    }
                });
        try {
            propertyRepository.delete(property);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Error occurred while deleting property: " + e.getMessage(), e);
        }    }
    @Override
    public List<PropertyResponseDto> getAllProperties() {
        List<Property> properties = propertyRepository.findAll();

        if (properties.isEmpty()) {
            throw new NoPropertiesFoundException("No properties found");
        }
        return properties.stream()
                .map(propertyDtoMapper::toPropertyResponseDto)
                .toList();
    }
    @Override
    public Map<Long, String> getAllAvailableProperties() {
        Optional<List<Property>> optionalProperties = propertyRepository.findByStatus(Property.Status.AVAILABLE);
        List<Property> properties = optionalProperties
                .orElseThrow(() -> new NoPropertiesFoundException("No properties available found"));
        return properties.stream()
                .collect(Collectors.toMap(Property::getId, Property::getAddress));
    }
    private Set<Property> findRelatedProperties(Set<Long> ids) {
        return propertyRepository.findByIds(ids);
    }
}
