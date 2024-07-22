package org.asm.immomanage.service;
import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.tenantDto.TenantDtoMapper;
import org.asm.immomanage.dto.tenantDto.TenantDto;
import org.asm.immomanage.models.Tenant;
import org.asm.immomanage.repository.TenantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TenantService implements ITenantService {

    private final TenantRepository tenantRepository;
    @Override
    public TenantDto addTenantService(Tenant tenant) {
        Tenant savedTenant = tenantRepository.save(tenant);
        return TenantDtoMapper.toTenantDto(savedTenant);
    }

    @Override
    public TenantDto updateTenantService(Long id, TenantDto tenantDto) {
        Optional<Tenant> optionalTenant = tenantRepository.findById(id);
        if (optionalTenant.isPresent()){
            Tenant tenant = optionalTenant.get();
            Tenant updatedTenant = tenantRepository.save(tenant);
            return TenantDtoMapper.toTenantDto(updatedTenant);
        }
        return null;
    }
    @Override
    public TenantDto getTenantService(Long idTenant) {
        Optional<Tenant> tenantOptional = tenantRepository.findById(idTenant);
        return tenantOptional.map(TenantDtoMapper::toTenantDto).orElse(null);    }

    @Override
    public Optional<Tenant> verifyTenantService(String cin) {
        Optional<Tenant> tenantOptional = tenantRepository.findByCin(cin);
        if (tenantOptional.isPresent()) {
            Tenant tenant = tenantOptional.get();
            return Optional.of(tenant);
        } else {
            return Optional.empty();
        }    }
    @Override
    public void deleteTenantService(Long idTenant) {
        Optional<Tenant> tenantOptional = tenantRepository.findById(idTenant);
        tenantOptional.ifPresent(tenantRepository::delete);
    }

    @Override
    public Optional<List<Tenant>> getAllTenantsService() {
        List<Tenant> tenants = tenantRepository.findAll();
        return tenants.isEmpty() ? Optional.empty() : Optional.of(tenants);
    }
}
