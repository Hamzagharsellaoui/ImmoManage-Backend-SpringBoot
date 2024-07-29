package org.asm.immomanage.dto.tenantDto;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class TenantResponseDto {
    private long id;
    private String cin;
    private String name;
    private String email;
    private String phoneNumber;
    private long actualPropertyId;
    private Set<Long> propertyIds;
    private long managerId;
}

