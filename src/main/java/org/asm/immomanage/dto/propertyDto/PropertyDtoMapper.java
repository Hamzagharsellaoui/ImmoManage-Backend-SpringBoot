package org.asm.immomanage.dto.propertyDto;

import lombok.AllArgsConstructor;
import org.asm.immomanage.dto.propertyEquipmentsDto.PropertyEquipmentDto;
import org.asm.immomanage.dto.propertyEquipmentsDto.PropertyEquipmentDtoMapper;
import org.asm.immomanage.dto.propertyImagesDto.PropertyImageDto;
import org.asm.immomanage.dto.propertyImagesDto.PropertyImagesDtoMapper;
import org.asm.immomanage.models.*;
import org.asm.immomanage.repository.UserRepository;
import org.asm.immomanage.repository.TenantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class PropertyDtoMapper {
    private final UserRepository userRepository;
    private final TenantRepository tenantRepository;

    public Property toProperty(PropertyResponseDto propertyResponseDto) {
        String userMail = propertyResponseDto.managerEmail();
        User manager = userRepository.findByEmail(userMail).get();

        List<PropertyEquipments> equipments = convertEquipments(propertyResponseDto.propertyEquipmentDto());
        List<PropertyImages> images = convertImages(propertyResponseDto.propertyImages());
        List<Tenant> tenants = convertTenants(propertyResponseDto.cinTenants());
        Property property = Property.builder()
                .rentPrice(propertyResponseDto.rentPrice())
                .description(propertyResponseDto.description())
                .address(propertyResponseDto.address())
                .status(propertyResponseDto.status() != null ? propertyResponseDto.status() : Property.Status.AVAILABLE)
                .manager(manager)
                .propertyEquipments(equipments)
                .propertyImages(images)
                .tenants(tenants)
                .build();
        equipments.forEach(equipment -> equipment.setProperty(property));
        images.forEach(image -> image.setProperty(property));

        return property;
    }
    public PropertyResponseDto toPropertyDto(Property property) {
        return new PropertyResponseDto(
        property.getId(),
        property.getRentPrice(),
        property.getDescription(),
        property.getAddress(),
        property.getStatus(),
        PropertyEquipmentDtoMapper.toPropertyEquipmentDto(property.getPropertyEquipments()),
        PropertyImagesDtoMapper.toPropertyImagesDto(property.getPropertyImages()),
        property.getTenants().stream().map(Tenant::getCin).toList(),
        property.getManager().getEmail());
    }
    public List<PropertyEquipments> convertEquipments(List<PropertyEquipmentDto> equipmentsDto) {
        return equipmentsDto.stream()
                .map(equipmentDto -> {
                    PropertyEquipments equipment = new PropertyEquipments();
                    equipment.setEquipmentName(equipmentDto.equipmentName());
                    equipment.setProperty(null);
                    return equipment;
                }).toList();
    }
    public List<PropertyImages> convertImages(List<PropertyImageDto> imagesDto) {
        return imagesDto.stream()
                .map(imageDto -> {
                    PropertyImages image = new PropertyImages();
                    image.setImageUrl(imageDto.getImageUrl());
                    image.setProperty(null);
                    return image;
                }).toList();
    }
    public List<Tenant> convertTenants(List<String> cinTenants) {
        return cinTenants.stream()
                .map(cin -> tenantRepository.findByCin(cin)
                        .orElseThrow(() -> new NoSuchElementException("Tenant not found with CIN: " + cin)))
                .toList();
    }
    public static PropertyResponseDto toPropertyResponseDto(Property property) {
        List<PropertyEquipmentDto> equipmentsDto = PropertyEquipmentDtoMapper.toPropertyEquipmentDto(property.getPropertyEquipments());

        List<PropertyImageDto> imagesDto = PropertyImagesDtoMapper.toPropertyImagesDto(property.getPropertyImages());


        List<String> tenantCins = property.getTenants().stream()
                .map(Tenant::getCin)
                .toList();

        return new PropertyResponseDto(
                property.getId(),
                property.getRentPrice(),
                property.getDescription(),
                property.getAddress(),
                property.getStatus(),
                equipmentsDto,
                imagesDto,
                tenantCins,
                property.getManager().getEmail()
        );
    }


}
