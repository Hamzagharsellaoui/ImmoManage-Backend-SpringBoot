package org.asm.immomanage.dto.authenticationDto;

public record UserInfoResponse(
        String name,
        String email,
        Long id){}
