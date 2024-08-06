package org.asm.immomanage.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.asm.immomanage.dto.BaseResponseDto;
import org.asm.immomanage.dto.propertyDto.PropertyRequestDto;
import org.asm.immomanage.dto.propertyDto.PropertyResponseDto;
import org.asm.immomanage.mappers.PropertyDtoMapper;
import org.asm.immomanage.models.ImageModel;
import org.asm.immomanage.service.IPropertyService;
import org.asm.immomanage.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping("/property")
public class PropertyController {
    private final IPropertyService propertyService;
    private final IUserService userService;
    private final PropertyDtoMapper propertyDtoMapper;

    @PostMapping(value = "/addProperty", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BaseResponseDto<PropertyResponseDto>> addProperty(
            @RequestPart("property") String propertyRequestDtoJson,
            @RequestPart("imageFile") MultipartFile[] files) throws IOException {
        PropertyRequestDto propertyRequestDto = new ObjectMapper().readValue(propertyRequestDtoJson, PropertyRequestDto.class);
        PropertyResponseDto savedProperty = propertyService.addPropertyService(propertyRequestDto, files);
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.CREATED, "Property added successfully", false, savedProperty), HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<BaseResponseDto<PropertyResponseDto>> updateProperty(@PathVariable long id, @RequestBody PropertyRequestDto propertyRequestDto) {
        Optional<PropertyResponseDto> updatedProperty = Optional.of(propertyService.updatePropertyService(id, propertyRequestDto));
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "The Property has been updated", false, updatedProperty.get()), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponseDto<PropertyResponseDto>> getProperty(@PathVariable long id) {
        PropertyResponseDto searchedProperty = propertyService.getPropertyService(id);
        if (searchedProperty != null) {
            return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "Property retrieved successfully", false, searchedProperty), HttpStatus.OK);
        }
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.NOT_FOUND, "Property not found", true, null), HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<BaseResponseDto<String>> deleteProperty(@PathVariable long id) {
        propertyService.deletePropertyService(id);
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "Deletion successful", false, null), HttpStatus.OK);
    }

    @GetMapping("/properties")
    public ResponseEntity<BaseResponseDto<List<PropertyResponseDto>>> getAllProperties() {
        List<PropertyResponseDto> propertiesDto = propertyService.getAllProperties();
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "Properties retrieved successfully", false, propertiesDto), HttpStatus.OK);
    }
    @GetMapping("/availableProperties")
    public ResponseEntity<BaseResponseDto< Map<Long,String>>> getAllAvailableProperties() {
        Map<Long,String> availablePropertiesIdsDto = propertyService.getAllAvailableProperties();
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.OK, "Availabe Properties IDs retrieved successfully", false, availablePropertiesIdsDto), HttpStatus.OK);
    }
}

