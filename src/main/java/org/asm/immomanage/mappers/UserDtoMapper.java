package org.asm.immomanage.mappers;

import lombok.Data;
import org.asm.immomanage.dto.authenticationDto.UserInfoResponse;
import org.asm.immomanage.dto.userDto.UserDto;
import org.asm.immomanage.models.User;
import org.asm.immomanage.repository.UserRepository;
import org.springframework.stereotype.Component;

@Data
@Component
public class UserDtoMapper {
    private final UserRepository userRepository;
    public static UserDto toUserDto(User user) {
        return new UserDto(user.getName(), user.getEmail());
    }
    public User toUser(UserDto userDto) {
        return userRepository.findByEmail(userDto.getEmail()).get();
    }
    public UserInfoResponse toUserInfoResponse(User user) {
        return new UserInfoResponse(
                user.getName(),
                user.getEmail(),
                user.getId());
    }
}
