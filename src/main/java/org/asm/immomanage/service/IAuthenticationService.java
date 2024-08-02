package org.asm.immomanage.service;

import jakarta.validation.Valid;
import org.asm.immomanage.dto.authenticationDto.AuthenticationResponse;
import org.asm.immomanage.dto.authenticationDto.LoginRequestDto;
import org.asm.immomanage.dto.authenticationDto.RegisterRequestDto;
import org.asm.immomanage.models.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Component
public interface IAuthenticationService {
    void registerUserService(@Valid RegisterRequestDto registerRequestDto);
    AuthenticationResponse loginUserService(LoginRequestDto request);
    Optional<User> verifyUserService(String email);
}
