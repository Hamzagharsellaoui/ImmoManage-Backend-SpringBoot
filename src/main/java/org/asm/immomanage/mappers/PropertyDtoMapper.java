package org.asm.immomanage.mappers;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.asm.immomanage.dto.propertyDto.PropertyRequestDto;
import org.asm.immomanage.dto.propertyDto.PropertyResponseDto;

import org.asm.immomanage.dto.propertyEquipmentsDto.PropertyEquipmentDto;
import org.asm.immomanage.models.*;

import org.asm.immomanage.repository.TenantRepository;
import org.asm.immomanage.repository.UserRepository;
import org.asm.immomanage.utils.Status;
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
    private final UserRepository userRepository;

    public Property toProperty(PropertyRequestDto propertyRequestDto) {
        Property property = Property.builder()
                .rentPrice(propertyRequestDto.rentPrice())
                .description(propertyRequestDto.description())
                .address(propertyRequestDto.address())
                .status(Optional.ofNullable(propertyRequestDto.status()).orElse(Status.AVAILABLE))
                .propertyImages(propertyRequestDto.propertyImages())
                .tenants(IdsToTenants(propertyRequestDto.tenantsIDS()))
                .manager(userRepository.findById(propertyRequestDto.managerID()).get())
                .propertyEquipments(new HashSet<>())
                .propertyImages(propertyRequestDto.propertyImages())
                .build();
        if(propertyRequestDto.propertyEquipmentDto()!=null && !propertyRequestDto.propertyEquipmentDto().isEmpty()){
            Set<PropertyEquipments> equipments = propertyRequestDto.propertyEquipmentDto().stream()
                    .map(propertyEquipmentDtoMapper::toPropertyEquipment)
                    .collect(Collectors.toSet());
            equipments.forEach(property::addPropertyEquipment);

        }
        return property;
    }
    public Property toProperty(PropertyResponseDto  propertyResponseDto) {
        Property property = Property.builder()
                .id(propertyResponseDto.id())
                .rentPrice(propertyResponseDto.rentPrice())
                .description(propertyResponseDto.description())
                .address(propertyResponseDto.address())
                .status(Optional.ofNullable(propertyResponseDto.status()).orElse(Status.AVAILABLE))
                .tenants(IdsToTenants(propertyResponseDto.tenantsIDS()))
                .manager(userRepository.findById(propertyResponseDto.managerID()).get())
                .propertyEquipments(new HashSet<>())
                .build();

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
                        .stream().map(PropertyEquipmentDto::equipmentName).collect(Collectors.toSet()))
                .propertyNames(property.getPropertyImages().stream().map(ImageModel::getName).collect(Collectors.toSet()))
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
    public Set<Long> tenantsToIds(Set<Tenant> tenantList) {
        if(tenantList==null || tenantList.isEmpty()){
            return Collections.emptySet();
        }
        return tenantList.stream().map(Tenant::getId).collect(Collectors.toSet());
    }
}
