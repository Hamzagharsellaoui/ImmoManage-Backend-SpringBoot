package org.asm.immomanage.dto.authenticationDto;

public record LoginRequestDto (
    String email,
    String password){}
