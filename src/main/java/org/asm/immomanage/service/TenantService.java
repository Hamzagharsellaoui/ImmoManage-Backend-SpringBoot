package org.asm.immomanage.service;
import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.tenantDto.TenantResponseDto;
import org.asm.immomanage.exception.NoPropertiesFoundException;
import org.asm.immomanage.exception.NoTenantsFoundException;
import org.asm.immomanage.exception.PropertyAlreadyExistsException;
import org.asm.immomanage.exception.PropertyNoAvailableException;
import org.asm.immomanage.mappers.TenantDtoMapper;
import org.asm.immomanage.dto.tenantDto.TenantRequestDto;
import org.asm.immomanage.models.Property;
import org.asm.immomanage.models.Tenant;
import org.asm.immomanage.repository.PropertyRepository;
import org.asm.immomanage.repository.TenantRepository;
import org.asm.immomanage.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TenantService implements ITenantService {

    private final TenantRepository tenantRepository;
    private final PropertyRepository propertyRepository;
    private final TenantDtoMapper tenantDtoMapper;
    private final UserRepository userRepository;

    @Override
    public TenantResponseDto addTenantService(TenantRequestDto tenantRequestDto) {
        Optional<Tenant> existingTenant = tenantRepository.findByCin(tenantRequestDto.getCin());
        Property actualProperty= propertyRepository.findById(tenantRequestDto.getActualPropertyId()).get();
        if (existingTenant.isPresent()) {
            throw new PropertyAlreadyExistsException("Tenant already exists with cin: " + tenantRequestDto.getCin());
        }
        if(actualProperty.getStatus()!= Property.Status.AVAILABLE){
            throw new PropertyNoAvailableException("Property with address :"+actualProperty.getAddress()+" is "+actualProperty.getStatus());
        }
        Tenant tenant = tenantDtoMapper.toTenant(tenantRequestDto);
        Tenant savedTenant=tenantRepository.save(tenant);
        actualProperty.setStatus(Property.Status.OCCUPIED);
        propertyRepository.save(actualProperty);
        return tenantDtoMapper.toTenantResponseDto(savedTenant);
    }
    @Override
    public TenantResponseDto updateTenantService(Long id, TenantRequestDto tenantRequestDto) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Property not found with id " + id));
        Property actualProperty= propertyRepository.findById(tenantRequestDto.getActualPropertyId()).get();
        tenant.setCin(tenantRequestDto.getCin());
        tenant.setName(tenantRequestDto.getName());
        tenant.setEmail(tenantRequestDto.getEmail());
        if(actualProperty.getStatus()!= Property.Status.AVAILABLE){
            throw new PropertyNoAvailableException("Property with address :"+actualProperty.getAddress()+" is "+actualProperty.getStatus());
        }
        if(tenant.getIdActualProperty()!= tenantRequestDto.getActualPropertyId()){
            propertyRepository.findById(tenant.getIdActualProperty()).get().setStatus(Property.Status.AVAILABLE);
            propertyRepository.save(propertyRepository.findById(tenant.getIdActualProperty()).get());
            tenant.setIdActualProperty(tenantRequestDto.getActualPropertyId());
            actualProperty.setStatus(Property.Status.OCCUPIED);
            propertyRepository.save(actualProperty);
        }
        tenant.addProperty(propertyRepository.findById(tenantRequestDto.getActualPropertyId()).orElseThrow(() -> new NoPropertiesFoundException("Property not found with id " + id)));
        tenant.setManager(userRepository.getReferenceById(tenantRequestDto.getManagerId()));
        tenantRepository.save(tenant);
        return tenantDtoMapper.toTenantResponseDto(tenant);
    }
    @Override
    public TenantResponseDto getTenantService(Long idTenant) {
        Optional<Tenant> tenantOptional = tenantRepository.findById(idTenant);
        return tenantOptional.map(tenantDtoMapper::toTenantResponseDto).orElse(null);
    }
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
    public List<TenantResponseDto> getAllTenantsService() {
        List<Tenant> tenants = tenantRepository.findAll();
        if(tenants.isEmpty()){
            throw new NoTenantsFoundException("No tenants found");
        }
        return tenants.stream()
                .map(tenantDtoMapper::toTenantResponseDto)
                .toList();
    }
}
