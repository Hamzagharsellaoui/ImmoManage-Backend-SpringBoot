package org.asm.immomanage.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.authenticationDto.AuthenticationResponse;
import org.asm.immomanage.dto.authenticationDto.LoginRequestDto;
import org.asm.immomanage.dto.authenticationDto.RegisterRequestDto;
import org.asm.immomanage.exception.InvalidCredentialsException;
import org.asm.immomanage.exception.UserAlreadyExistsException;
import org.asm.immomanage.models.User;
import org.asm.immomanage.repository.TokenRepository;
import org.asm.immomanage.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;


    @Override
    public Optional<User> verifyUserService(String email) {
        return userRepository.findByEmail(email);
    }
    @Override
    public User findByEmail(String managerEmail) {
        return userRepository.findByEmail(managerEmail).orElse(null);
    }

    @Override
    public void registerUserService(@Valid RegisterRequestDto registerRequestDto) {
        if (verifyUserService(registerRequestDto.email()).isPresent()) {
            throw new UserAlreadyExistsException("Account already exists");
        }
        var user=User.builder()
                .name(registerRequestDto.name())
                .email(registerRequestDto.email())
                .password(passwordEncoder.encode(registerRequestDto.password()))
                .accountLocked(false)
                .build();
        userRepository.save(user);
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

//    public String generateAndSaveActivationToken(User user) {
//        String generatedToken = generateActivationCode(6);
//        var token = Token.builder()
//                .token(generatedToken)
//                .createdAt(LocalDateTime.now())
//                .expiresAt(LocalDateTime.now().plusMinutes(20))
//                .user(user)
//                .build();
//        tokenRepository.save(token);
//        return generatedToken;
//    }
//
//    private String generateActivationCode(int length) {
//        String characters = "0123456789";
//        StringBuilder codeBuilder = new StringBuilder();
//        SecureRandom secureRandom = new SecureRandom();
//        for (int i = 0; i < length; i++) {
//            int randomIndex = secureRandom.nextInt(characters.length());
//            codeBuilder.append(characters.charAt(randomIndex));
//        }
//        return codeBuilder.toString();
//    }
}
