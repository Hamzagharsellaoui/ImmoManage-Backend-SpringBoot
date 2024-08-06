package org.asm.immomanage.mappers;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.asm.immomanage.dto.propertyEquipmentsDto.PropertyEquipmentDto;
import org.asm.immomanage.exception.NoPropertiesFoundException;
import org.asm.immomanage.models.PropertyEquipments;
import org.asm.immomanage.repository.PropertyEquipmentRepository;
import org.asm.immomanage.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PropertyEquipmentDtoMapper {
    private final PropertyRepository propertyRepository;
    private final PropertyEquipmentRepository propertyEquipmentRepository;

    public static Set<PropertyEquipmentDto> toPropertyEquipmentDtos(Set<PropertyEquipments> propertyEquipments) {
        if(propertyEquipments==null || propertyEquipments.isEmpty()){
            return Collections.emptySet();
        }
        return propertyEquipments.stream()
                .map(equipment -> new PropertyEquipmentDto(
                        equipment.getEquipmentName(),
                        equipment.getProperty().getId(),
                        equipment.getProperty().getAddress()))
                .collect(Collectors.toSet());
    }
    public Set<PropertyEquipments> toPropertyEquipments(Set<PropertyEquipmentDto> propertyEquipmentDtos) {
        if(propertyEquipmentDtos==null || propertyEquipmentDtos.isEmpty()){
            return Collections.emptySet();
        }
        return propertyEquipmentDtos.stream()
                .map(this::toPropertyEquipment)
                .collect(Collectors.toSet());
    }
    public PropertyEquipments toPropertyEquipment(PropertyEquipmentDto propertyEquipmentDto) {
        return PropertyEquipments.builder()
                .equipmentName(propertyEquipmentDto.equipmentName())
                .build();
    }
}
