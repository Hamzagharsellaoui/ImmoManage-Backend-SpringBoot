package org.asm.immomanage.service;
import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.propertyDto.PropertyRequestDto;
import org.asm.immomanage.dto.propertyDto.PropertyResponseDto;
import org.asm.immomanage.dto.tenantDto.TenantResponseDto;
import org.asm.immomanage.exception.NoPropertiesFoundException;
import org.asm.immomanage.exception.NoTenantsFoundException;
import org.asm.immomanage.exception.PropertyAlreadyExistsException;
import org.asm.immomanage.exception.PropertyNoAvailableException;
import org.asm.immomanage.mappers.TenantDtoMapper;
import org.asm.immomanage.dto.tenantDto.TenantRequestDto;
import org.asm.immomanage.models.Property;
import org.asm.immomanage.models.PropertyEquipments;
import org.asm.immomanage.models.PropertyImages;
import org.asm.immomanage.models.Tenant;
import org.asm.immomanage.repository.PropertyEquipmentRepository;
import org.asm.immomanage.repository.PropertyRepository;
import org.asm.immomanage.repository.TenantRepository;
import org.asm.immomanage.repository.UserRepository;
import org.asm.immomanage.utils.Status;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class TenantService implements ITenantService {

    private final TenantRepository tenantRepository;
    private final PropertyRepository propertyRepository;
    private final TenantDtoMapper tenantDtoMapper;
    private final UserRepository userRepository;
    private final PropertyEquipmentRepository propertyEquipmentRepository;
    @Override
    public TenantResponseDto addTenantService(TenantRequestDto tenantRequestDto) {
        Optional<Tenant> existingTenant = tenantRepository.findByCin(tenantRequestDto.getCin());
        Optional<Property> actualProperty= propertyRepository.findById(tenantRequestDto.getActualPropertyId());
        if (existingTenant.isPresent()) {
            throw new PropertyAlreadyExistsException("Tenant already exists with cin: " + tenantRequestDto.getCin());
        }
        if(actualProperty.get().getStatus()!= Status.AVAILABLE){
            throw new PropertyNoAvailableException("Property with address :"+actualProperty.get().getAddress()+" is "+actualProperty.get().getStatus());
        }
        Tenant tenant = tenantDtoMapper.toTenant(tenantRequestDto);
        Tenant savedTenant=tenantRepository.save(tenant);
        actualProperty.get().setStatus(Status.OCCUPIED);
        propertyRepository.save(actualProperty.get());
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
        if(actualProperty.getStatus()!= Status.AVAILABLE){
            throw new PropertyNoAvailableException("Property with address :"+actualProperty.getAddress()+" is "+actualProperty.getStatus());
        }
        if(tenant.getIdActualProperty()!= tenantRequestDto.getActualPropertyId()){
            propertyRepository.findById(tenant.getIdActualProperty()).get().setStatus(Status.AVAILABLE);
            propertyRepository.save(propertyRepository.findById(tenant.getIdActualProperty()).get());
            tenant.setIdActualProperty(tenantRequestDto.getActualPropertyId());
            actualProperty.setStatus(Status.OCCUPIED);
            tenant.getProperties().add(actualProperty);
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
        Tenant tenant = tenantRepository.findById(idTenant)
                .orElseThrow(() -> new RuntimeException("Tenant not found with id: " + idTenant));
        tenant.getProperties().forEach(property -> {
            property.getTenants().remove(tenant);
            property.setStatus(Status.AVAILABLE);
            propertyRepository.save(property);
        });
        try {
            tenantRepository.delete(tenant);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Error occurred while deleting tenant: " + e.getMessage(), e);
        }
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
