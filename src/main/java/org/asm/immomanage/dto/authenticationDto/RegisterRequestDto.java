package org.asm.immomanage.dto.authenticationDto;

public record RegisterRequestDto (
     String name,
     String email,
     String password){}
