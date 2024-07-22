package org.asm.immomanage.dto.tenantDto;

import lombok.AllArgsConstructor;
import org.asm.immomanage.models.Property;
import org.asm.immomanage.models.Tenant;
import org.asm.immomanage.models.User;
import org.asm.immomanage.repository.PropertyRepository;
import org.asm.immomanage.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class TenantDtoMapper {
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;

    public Tenant toTenant(TenantDto tenantDto) {
        Tenant tenant = new Tenant();
        tenant.setCin(tenantDto.getCin());
        tenant.setName(tenantDto.getName());
        tenant.setEmail(tenantDto.getEmail());
        tenant.setPhoneNumber(tenantDto.getPhoneNumber());
        tenant.setAddress(tenantDto.getActualAddress());

        if (tenantDto.getManagerEmail() != null) {
            String userMail = tenantDto.getManagerEmail();
            User manager = userRepository.findByEmail(userMail)
                    .orElseThrow(() -> new NoSuchElementException("Manager not found with email: " + userMail));
            tenant.setManager(manager);
        }

        // Set properties to empty list initially, if you need to set properties, you can do so elsewhere
        tenant.setProperties(List.of());

        return tenant;
    }

    public static TenantDto toTenantDto(Tenant tenant) {
        TenantDto tenantDto = new TenantDto();
        tenantDto.setCin(tenant.getCin());
        tenantDto.setName(tenant.getName());
        tenantDto.setEmail(tenant.getEmail());
        tenantDto.setPhoneNumber(tenant.getPhoneNumber());
        tenantDto.setActualAddress(tenant.getAddress());

        if (tenant.getManager() != null) {
            tenantDto.setManagerEmail(tenant.getManager().getEmail());
        }
        return tenantDto;
    }

    // Example method to convert property IDs if needed
    private List<Property> convertProperties(List<Long> propertyIds) {
        return propertyIds.stream()
                .map(id -> propertyRepository.findById(id)
                        .orElseThrow(() -> new NoSuchElementException("Property not found with ID: " + id)))
                .collect(Collectors.toList());
    }
}
