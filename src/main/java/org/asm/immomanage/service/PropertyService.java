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
import org.asm.immomanage.models.*;
import org.asm.immomanage.repository.PropertyRepository;
import org.asm.immomanage.repository.UserRepository;
import org.asm.immomanage.utils.Status;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.List;
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
    private final IImageModelService imageModelService;


    @Override
    public PropertyResponseDto addPropertyService(PropertyRequestDto propertyRequestDto, MultipartFile[] files) throws IOException {
        Optional<Property> existingProperty = propertyRepository.findByAddress(propertyRequestDto.address());
        if (existingProperty.isPresent()) {
            throw new PropertyAlreadyExistsException("Property already exists with address: " + propertyRequestDto.address());
        }
        Property property = propertyDtoMapper.toProperty(propertyRequestDto);
        try {
            Set<ImageModel> images = imageModelService.uploadImage(files, property);
            property.setPropertyImages(images);
        } catch (Exception e) {
            throw new IOException(e.getMessage());
        }
        Property savedProperty = propertyRepository.save(property);
        return propertyDtoMapper.toPropertyResponseDto(savedProperty);
    }

    public PropertyResponseDto updatePropertyService(Long id, PropertyRequestDto propertyRequestDto) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Property not found with id " + id));

        property.setRentPrice(propertyRequestDto.rentPrice());
        property.setDescription(propertyRequestDto.description());
        property.setAddress(propertyRequestDto.address());
        property.setStatus(Optional.ofNullable(propertyRequestDto.status()).orElse(Status.AVAILABLE));

        Set<Tenant> updatedTenants = propertyDtoMapper.IdsToTenants(propertyRequestDto.tenantsIDS());
        for (Tenant tenant : updatedTenants) {
            tenant.addProperty(property);
        }
        property.setTenants(updatedTenants);

        Set<PropertyEquipments> updatedEquipments = propertyEquipmentDtoMapper.toPropertyEquipments(propertyRequestDto.propertyEquipmentDto());
        for (PropertyEquipments equipment : updatedEquipments) {
            equipment.setProperty(property);
        }
        property.setPropertyEquipments(updatedEquipments);

        Property savedProperty = propertyRepository.save(property);
        return propertyDtoMapper.toPropertyResponseDto(savedProperty);
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
        Optional<List<Property>> optionalProperties = propertyRepository.findByStatus(Status.AVAILABLE);
        List<Property> properties = optionalProperties
                .orElseThrow(() -> new NoPropertiesFoundException("No properties available found"));
        return properties.stream()
                .collect(Collectors.toMap(Property::getId, Property::getAddress));
    }
    private Set<Property> findRelatedProperties(Set<Long> ids) {
        return propertyRepository.findByIds(ids);
    }
}
