package org.asm.immomanage.controller;


import lombok.AllArgsConstructor;
import org.asm.immomanage.dto.BaseResponseDto;
import org.asm.immomanage.dto.tenantDto.TenantRequestDto;
import org.asm.immomanage.dto.tenantDto.TenantResponseDto;
import org.asm.immomanage.mappers.TenantDtoMapper;
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

    @PostMapping("/addTenant")
    public ResponseEntity<BaseResponseDto<TenantResponseDto>> addTenant(@RequestBody TenantRequestDto tenantRequestDto) {
    TenantResponseDto savedTenant = tenantService.addTenantService(tenantRequestDto);
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.CREATED, "Tenant added successfully", false, savedTenant), HttpStatus.CREATED);
    }
    @PutMapping("/updateTenant/{id}")
    public ResponseEntity<BaseResponseDto<TenantResponseDto>> updateTenant(@PathVariable long id, @RequestBody TenantRequestDto tenantRequestDto) {
        Optional<TenantResponseDto> updatedProperty = Optional.of(tenantService.updateTenantService(id, tenantRequestDto));
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "The Tenant has been updated", false, updatedProperty.get()), HttpStatus.OK);
    }
    @GetMapping("/getTenant/{id}")
    public ResponseEntity<BaseResponseDto<TenantResponseDto>> getTenant(@PathVariable long id) {
        TenantResponseDto searchedTenant = tenantService.getTenantService(id);
        if (searchedTenant != null) {
            return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "Tenant retrieved successfully", false, searchedTenant), HttpStatus.OK);
        }
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.NOT_FOUND, "Property not found", true, null), HttpStatus.NOT_FOUND);    }
    @DeleteMapping("/deleteTenant/{id}")
    public ResponseEntity<BaseResponseDto<String>> deleteTenant(@PathVariable long id) {
        tenantService.deleteTenantService(id);
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "Deletion successful", false, null), HttpStatus.OK);
    }
    @GetMapping("/getAllTenants")
    public ResponseEntity<BaseResponseDto<List<TenantResponseDto>>> getAllTenants() {
        List<TenantResponseDto> tenantResponseDto = tenantService.getAllTenantsService();
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "Tenants retrieved successfully", false, tenantResponseDto), HttpStatus.OK);
    }
}

