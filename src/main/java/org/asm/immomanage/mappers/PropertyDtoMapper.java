package org.asm.immomanage.mappers;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.asm.immomanage.dto.propertyDto.PropertyRequestDto;
import org.asm.immomanage.dto.propertyDto.PropertyResponseDto;

import org.asm.immomanage.models.*;

import org.asm.immomanage.repository.TenantRepository;
import org.asm.immomanage.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

@Data
@Service
@AllArgsConstructor
public class PropertyDtoMapper {
    private final TenantRepository tenantRepository;
    private final UserDetailsService userDetailsService;
    private final PropertyEquipmentDtoMapper propertyEquipmentDtoMapper;
    private final PropertyImagesDtoMapper propertyImagesDtoMapper;
    private final UserRepository userRepository;

    public Property toProperty(PropertyRequestDto propertyRequestDto) {

        Property property = Property.builder()
                .rentPrice(propertyRequestDto.rentPrice())
                .description(propertyRequestDto.description())
                .address(propertyRequestDto.address())
                .status(Optional.ofNullable(propertyRequestDto.status()).orElse(Property.Status.AVAILABLE))
                .tenants(IdsToTenants(propertyRequestDto.tenantsIDS()))
                .manager(userRepository.findById(propertyRequestDto.managerID()).get())
                .propertyEquipments(new ArrayList<>())
                .propertyImages(new ArrayList<>())
                .build();
        if(propertyRequestDto.propertyEquipmentDto()!=null && !propertyRequestDto.propertyEquipmentDto().isEmpty()){
            List<PropertyEquipments> equipments = propertyRequestDto.propertyEquipmentDto().stream()
                    .map(propertyEquipmentDtoMapper::toPropertyEquipment)
                    .toList();
            equipments.forEach(property::addPropertyEquipment);

        }
        if(propertyRequestDto.propertyImages()!=null && !propertyRequestDto.propertyImages().isEmpty()){
            List<PropertyImages> images = propertyRequestDto.propertyImages().stream()
                    .map(propertyImagesDtoMapper::toPropertyImage)
                    .toList();
            images.forEach(property::addPropertyImage);
        }
        return property;
    }
    public  PropertyResponseDto toPropertyResponseDto(Property property) {
        return PropertyResponseDto.builder()
                .id(property.getId())
                .rentPrice(property.getRentPrice())
                .description(property.getDescription())
                .address(property.getAddress())
                .status(property.getStatus())
                .propertyEquipments(PropertyEquipmentDtoMapper.toPropertyEquipmentDtos(property.getPropertyEquipments())
                        .stream().map(equipmentDto->equipmentDto.equipmentName()).collect(Collectors.toSet()))
                .propertyImages(propertyImagesDtoMapper.toPropertyImagesDtos(property.getPropertyImages()).stream().map(image->image.imageUrl()).collect(Collectors.toSet()))
                .tenantsIDS(tenantsToIds(property.getTenants()))
                .managerID(property.getManager().getId())
                .build();
    }
    public Set<Tenant> IdsToTenants(Set<Long> listIDs) {
        if(listIDs==null || listIDs.isEmpty()){
            return Collections.emptySet();
        }
        return listIDs.stream().map(id->tenantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tenant not found with CIN: " + tenantRepository.findById(id).get().getCin())))
                .collect(Collectors.toSet());
    }
    public   Set<Long> tenantsToIds(Set<Tenant> tenantList) {
        if(tenantList==null || tenantList.isEmpty()){
            return Collections.emptySet();
        }
        return tenantList.stream().map(Tenant::getId).collect(Collectors.toSet());
    }
}
