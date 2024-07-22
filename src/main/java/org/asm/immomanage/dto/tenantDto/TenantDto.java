package org.asm.immomanage.dto.tenantDto;
import lombok.Data;

@Data
public class TenantDto {
    private String cin;
    private String name;
    private String email;
    private String phoneNumber;
    private String actualAddress;
    private String managerEmail;
}

