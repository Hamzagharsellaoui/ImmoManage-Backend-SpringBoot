package org.asm.immomanage.service;

import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.authenticationDto.*;

import org.asm.immomanage.mappers.UserDtoMapper;
import org.asm.immomanage.models.User;

import org.asm.immomanage.repository.UserRepository;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor

public class UserService implements IUserService {
    private final UserRepository userRepository;

    private final UserDtoMapper userDtoMapper;

    @Override
    public User findByEmail(String managerEmail) {
        return userRepository.findByEmail(managerEmail).orElse(null);
    }
    @Override
    public UserInfoResponse loadUserInfo(long id) {
        return userDtoMapper.toUserInfoResponse(userRepository.findById(id).get());
    }
}
