package org.asm.immomanage.service;

import org.asm.immomanage.dto.tenantDto.TenantDto;
import org.asm.immomanage.models.Tenant;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component

public interface ITenantService {
    TenantDto addTenantService(Tenant tenant);
    TenantDto updateTenantService(Long id, TenantDto tenantDto);
    TenantDto getTenantService(Long idTenant);
    Optional<Tenant> verifyTenantService(String address);
    void deleteTenantService(Long idTenant);

    Optional<List<Tenant>> getAllTenantsService();

}
