package org.asm.immomanage.dto.propertyEquipmentsDto;

import org.asm.immomanage.models.PropertyEquipments;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PropertyEquipmentDtoMapper {

    public static List<PropertyEquipmentDto> toPropertyEquipmentDto(List<PropertyEquipments> propertyEquipments) {
        return propertyEquipments.stream()
                .map(equipment -> new PropertyEquipmentDto(equipment.getEquipmentName()))
                .toList();
    }
//    public static List<PropertyEquipments> toPropertyEquipment(List<PropertyEquipmentDto> propertyEquimentDto){
//        return propertyEquimentDto.stream().map(equipmentDto->newPropertyEquipment(equipmentDto.getEq))
//    }
}
