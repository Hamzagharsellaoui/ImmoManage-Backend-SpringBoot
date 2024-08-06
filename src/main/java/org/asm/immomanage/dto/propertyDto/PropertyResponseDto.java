package org.asm.immomanage.dto.propertyDto;

import lombok.Builder;
import org.asm.immomanage.models.*;
import org.asm.immomanage.utils.Status;
import java.util.Set;

@Builder
public record PropertyResponseDto(
        long id,
        double rentPrice,
        String description,
        String address,
        Status status,
        Set<String> propertyEquipments,
        Set<String> propertyNames,
        Set<Long> tenantsIDS,
        Long managerID
        ){}




