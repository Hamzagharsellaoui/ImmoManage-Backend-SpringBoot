package org.asm.immomanage.service;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.authenticationDto.AuthenticationResponse;
import org.asm.immomanage.dto.authenticationDto.LoginRequestDto;
import org.asm.immomanage.dto.authenticationDto.RegisterRequestDto;
import org.asm.immomanage.exception.InvalidCredentialsException;
import org.asm.immomanage.exception.UserAlreadyExistsException;
import org.asm.immomanage.models.User;
import org.asm.immomanage.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@Data
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void registerUserService(@Valid RegisterRequestDto registerRequestDto) {
        if (verifyUserService(registerRequestDto.email()).isPresent()) {
            throw new UserAlreadyExistsException("Account already exists");
        }
        var user=User.builder()
                .name(registerRequestDto.name())
                .email(registerRequestDto.email())
                .password(passwordEncoder.encode(registerRequestDto.password()))
                .build();
        userRepository.save(user);
    }

    @Override
    public Optional<User> verifyUserService(String email) {
        return userRepository.findByEmail(email);
    }
    @Override
    public AuthenticationResponse loginUserService(LoginRequestDto request) {
        try {
            var auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.email(),
                            request.password()
                    )
            );
            var user = ((User) auth.getPrincipal());
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse
                    .builder()
                    .token(jwtToken)
                    .build();
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
    }
}
