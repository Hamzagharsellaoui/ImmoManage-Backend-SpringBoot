package org.asm.immomanage.service;

import org.asm.immomanage.dto.tenantDto.TenantRequestDto;
import org.asm.immomanage.dto.tenantDto.TenantResponseDto;
import org.asm.immomanage.models.Tenant;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component

public interface ITenantService {
    TenantResponseDto addTenantService(TenantRequestDto tenantRequestDto);
    TenantResponseDto updateTenantService(Long id, TenantRequestDto tenantRequestDto);
    TenantResponseDto getTenantService(Long idTenant);
    void deleteTenantService(Long idTenant);
    List<TenantResponseDto> getAllTenantsService();
    Optional<Tenant> verifyTenantService(String cin);

}
