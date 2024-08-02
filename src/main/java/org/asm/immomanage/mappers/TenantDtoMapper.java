package org.asm.immomanage.mappers;

import lombok.AllArgsConstructor;
import org.asm.immomanage.dto.tenantDto.TenantRequestDto;
import org.asm.immomanage.dto.tenantDto.TenantResponseDto;
import org.asm.immomanage.models.Property;
import org.asm.immomanage.models.Tenant;
import org.asm.immomanage.models.User;
import org.asm.immomanage.repository.PropertyRepository;
import org.asm.immomanage.repository.TenantRepository;
import org.asm.immomanage.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class TenantDtoMapper {
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;

    public Tenant toTenant(TenantRequestDto tenantRequestDto) {
         Tenant tenant= Tenant.builder()
                .cin(tenantRequestDto.getCin())
                .name(tenantRequestDto.getName())
                .email(tenantRequestDto.getEmail())
                .phoneNumber(tenantRequestDto.getPhoneNumber())
                .idActualProperty(tenantRequestDto.getActualPropertyId())
                .manager(userRepository.findById(tenantRequestDto.getManagerId()).get())
                 .address(propertyRepository.findById(tenantRequestDto.getActualPropertyId()).get().getAddress())
                .build();
        Optional<Property> property = propertyRepository.findById(tenantRequestDto.getActualPropertyId());
        property.ifPresent(tenant::addProperty);

        return tenant;
    }
    public TenantResponseDto toTenantResponseDto(Tenant tenant) {
        return TenantResponseDto.builder()
                .id(tenant.getId())
                .cin(tenant.getCin())
                .actualPropertyAddress(tenant.getAddress())
                .name(tenant.getName())
                .email(tenant.getEmail())
                .phoneNumber(tenant.getPhoneNumber())
                .actualPropertyId(tenant.getIdActualProperty())
                .managerId(tenant.getManager().getId())
                .propertyIds(tenant.getProperties().stream().map(Property::getId).collect(Collectors.toSet()))
                .build();
    }
}
