package org.asm.immomanage.mappers;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.asm.immomanage.dto.propertyDto.PropertyRequestDto;
import org.asm.immomanage.dto.propertyDto.PropertyResponseDto;

import org.asm.immomanage.models.*;

import org.asm.immomanage.repository.TenantRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Data
@Service
@AllArgsConstructor
public class PropertyDtoMapper {
    private final TenantRepository tenantRepository;
    private final UserDetailsService userDetailsService;
    private final PropertyEquipmentDtoMapper propertyEquipmentDtoMapper;
    private final PropertyImagesDtoMapper propertyImagesDtoMapper;

    public Property toProperty(PropertyRequestDto propertyRequestDto) {

        Property property = Property.builder()
                .rentPrice(propertyRequestDto.rentPrice())
                .description(propertyRequestDto.description())
                .address(propertyRequestDto.address())
                .status(Optional.ofNullable(propertyRequestDto.status()).orElse(Property.Status.AVAILABLE))
                .tenants(cinsToTenants(propertyRequestDto.cinTenants()))
                .manager((User) userDetailsService.loadUserByUsername(propertyRequestDto.managerEmail()))
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
                .propertyEquipmentDto(PropertyEquipmentDtoMapper.toPropertyEquipmentDtos(property.getPropertyEquipments()))
                .propertyImages(propertyImagesDtoMapper.toPropertyImagesDtos(property.getPropertyImages()))
                .cinTenants(tenatsToCins(property.getTenants()))
                .managerEmail(property.getManager().getEmail())
                .build();
    }
    public Set<Tenant> cinsToTenants(Set<String> listCin) {
        if(listCin==null || listCin.isEmpty()){
            return Collections.emptySet();
        }
        return listCin.stream().map(cin->tenantRepository.findByCin(cin)
                .orElseThrow(() -> new NoSuchElementException("Tenant not found with CIN: " + cin)))
                .collect(Collectors.toSet());
    }
    public   Set<String> tenatsToCins(Set<Tenant> tenantList) {
        if(tenantList==null || tenantList.isEmpty()){
            return Collections.emptySet();
        }
        return tenantList.stream().map(Tenant::getCin).collect(Collectors.toSet());
    }
}
