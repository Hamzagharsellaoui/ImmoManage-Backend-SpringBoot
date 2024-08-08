package org.asm.immomanage.service;
import jakarta.el.PropertyNotFoundException;
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
import org.asm.immomanage.models.*;
import org.asm.immomanage.repository.*;
import org.asm.immomanage.utils.Status;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RequiredArgsConstructor
@Service
public class TenantService implements ITenantService {

    private final TenantRepository tenantRepository;
    private final PropertyRepository propertyRepository;
    private final TenantDtoMapper tenantDtoMapper;
    private final UserRepository userRepository;
    private final RentalContractRepository rentalContractRepository;
    @Override
    public TenantResponseDto addTenantService(TenantRequestDto tenantRequestDto) {
        Optional<Tenant> existingTenant = tenantRepository.findByCin(tenantRequestDto.getCin());
        Property actualProperty = propertyRepository.findById(tenantRequestDto.getActualPropertyId())
                .orElseThrow(() -> new PropertyNotFoundException("Property not found with id " + tenantRequestDto.getActualPropertyId()));

        if (existingTenant.isPresent()) {
            throw new PropertyAlreadyExistsException("Tenant already exists with CIN: " + tenantRequestDto.getCin());
        }

        if (actualProperty.getStatus() != Status.AVAILABLE) {
            throw new PropertyNoAvailableException("Property with address: " + actualProperty.getAddress() + " is " + actualProperty.getStatus());
        }
        Tenant tenant = tenantDtoMapper.toTenant(tenantRequestDto);
        Tenant savedTenant = tenantRepository.save(tenant);
        actualProperty.setStatus(Status.OCCUPIED);
        propertyRepository.save(actualProperty);
        RentalContract rentalContract = new RentalContract();
        LocalDate currentDate = LocalDate.now();
        rentalContract.setStartDate(currentDate);
        rentalContract.setEndDate(currentDate.plusYears(1));
        rentalContract.setTenant(tenant);
        rentalContract.setProperty(actualProperty);
        rentalContract.setRentAmount(actualProperty.getRentPrice());
        rentalContract.setManager(tenant.getManager());
        rentalContractRepository.save(rentalContract);
        return tenantDtoMapper.toTenantResponseDto(savedTenant);
    }

    public TenantResponseDto updateTenantService(Long id, TenantRequestDto tenantRequestDto) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tenant not found with id " + id));

        Property actualProperty = propertyRepository.findById(tenantRequestDto.getActualPropertyId())
                .orElseThrow(() -> new NoSuchElementException("Property not found with id " + tenantRequestDto.getActualPropertyId()));

        tenant.setCin(tenantRequestDto.getCin());
        tenant.setName(tenantRequestDto.getName());
        tenant.setEmail(tenantRequestDto.getEmail());
        tenant.setPhoneNumber(tenantRequestDto.getPhoneNumber());

        if (!Objects.equals(tenant.getIdActualProperty(), tenantRequestDto.getActualPropertyId())) {
            // Ensure the new property is available
            if (actualProperty.getStatus() != Status.AVAILABLE) {
                throw new PropertyNoAvailableException("Property with address: " + actualProperty.getAddress() + " is " + actualProperty.getStatus());
            }

            // Set the old property to available
            Property oldProperty = propertyRepository.findById(tenant.getIdActualProperty())
                    .orElseThrow(() -> new NoSuchElementException("Old property not found with id " + tenant.getIdActualProperty()));
            oldProperty.setStatus(Status.AVAILABLE);
            propertyRepository.save(oldProperty);

            // Update tenant's property information
            tenant.setIdActualProperty(tenantRequestDto.getActualPropertyId());
            tenant.setAddress(actualProperty.getAddress());

            // Set the new property to occupied
            actualProperty.setStatus(Status.OCCUPIED);
            tenant.getProperties().add(actualProperty);
            propertyRepository.save(actualProperty);
        }

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
