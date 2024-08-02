package org.asm.immomanage.service;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.authenticationDto.*;
import org.asm.immomanage.dto.userDto.UserDto;
import org.asm.immomanage.exception.InvalidCredentialsException;
import org.asm.immomanage.exception.UserAlreadyExistsException;
import org.asm.immomanage.mappers.UserDtoMapper;
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
    private final UserDtoMapper userDtoMapper;

    @Override
    public User findByEmail(String managerEmail) {
        return userRepository.findByEmail(managerEmail).orElse(null);
    }
    @Override
    public UserInfoResponse loadUserInfo(UserInfoRequest userInfoRequest) {
        return userDtoMapper.toUserInfoResponse(userRepository.findById(userInfoRequest.id()).get());
    }




}
