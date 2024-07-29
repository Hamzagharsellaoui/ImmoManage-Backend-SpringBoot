package org.asm.immomanage.dto.tenantDto;
import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class TenantRequestDto {
    private String cin;
    private String name;
    private String email;
    private String phoneNumber;
    private long actualPropertyId;
    private long managerId;
}

