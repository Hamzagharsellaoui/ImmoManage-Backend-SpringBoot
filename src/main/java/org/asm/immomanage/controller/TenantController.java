package org.asm.immomanage.controller;


import lombok.AllArgsConstructor;
import org.asm.immomanage.dto.BaseResponseDto;
import org.asm.immomanage.dto.tenantDto.TenantDto;
import org.asm.immomanage.dto.tenantDto.TenantDtoMapper;
import org.asm.immomanage.models.Tenant;
import org.asm.immomanage.service.ITenantService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/tenant")
public class TenantController {
    private final ITenantService tenantService;
    private final TenantDtoMapper tenantDtoMapper;

//    @PostMapping()
//    public ResponseEntity<BaseResponseDto<PropertyDto>> addProperty(@RequestBody PropertyDto propertyDto) {
//        Optional<Property> existingProperty = propertyService.verifyPropertyService(propertyDto.getAddress());
//
//        if (existingProperty.isEmpty()) {
//            Property property = propertyDtoMapper.toProperty(propertyDto);
//            PropertyDto savedProperty = propertyService.addPropertyService(property);
//
//            return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.CREATED, "Property added successfully", false, savedProperty), HttpStatus.CREATED);
//        } else {
//            return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.FOUND, "Property already exists", false, null), HttpStatus.FOUND);
//        }
//    }
@PostMapping
public ResponseEntity<BaseResponseDto<TenantDto>> addTenant(@RequestBody TenantDto tenantDto) {
    Optional<Tenant> existingTenant = tenantService.verifyTenantService(tenantDto.getCin());

    if (existingTenant.isEmpty()) {
        Tenant tenant = tenantDtoMapper.toTenant(tenantDto);
        TenantDto savedTenant = tenantService.addTenantService(tenant);
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.CREATED, "Tenant added successfully", false, savedTenant), HttpStatus.CREATED);
    } else {
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.FOUND, "Tenant already exists", false, null), HttpStatus.FOUND);
    }
}

    @PutMapping("{id}")
    public ResponseEntity<BaseResponseDto<TenantDto>> updateTenant(@PathVariable long id, @RequestBody TenantDto tenantDto) {
        Optional<TenantDto> updatedProperty = Optional.of(tenantService.updateTenantService(id, tenantDto));
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "The Tenant has been updated", false, updatedProperty.get()), HttpStatus.CREATED);
    }
    @GetMapping("{id}")
    public ResponseEntity<BaseResponseDto<TenantDto>> getTenant(@PathVariable long id) {
        TenantDto searchedTenant = tenantService.getTenantService(id);
        if (searchedTenant != null) {
            return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "Tenant retrieved successfully", false, searchedTenant), HttpStatus.OK);
        }
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.NOT_FOUND, "Property not found", true, null), HttpStatus.NOT_FOUND);    }
    @DeleteMapping("{id}")
    public ResponseEntity<BaseResponseDto<String>> deleteTenant(@PathVariable long id) {
        tenantService.deleteTenantService(id);
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "Deletion successful", false, null), HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<BaseResponseDto<List<Tenant>>> getAllProperties() {
        Optional<List<Tenant>> tenantOptional = tenantService.getAllTenantsService();
        return tenantOptional.map(tenants -> new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "Properties retrieved successfully", false, tenants), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }
}



