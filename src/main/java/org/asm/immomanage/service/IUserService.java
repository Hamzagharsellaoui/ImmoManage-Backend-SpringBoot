package org.asm.immomanage.service;

import jakarta.validation.Valid;
import org.asm.immomanage.dto.authenticationDto.*;
import org.asm.immomanage.models.User;
import org.springframework.stereotype.Component;

import java.util.Optional;
@Component
public interface IUserService {
    User findByEmail(String managerEmail);

    UserInfoResponse loadUserInfo(long id);
}
    