package org.asm.immomanage.mappers;

import lombok.Data;
import org.asm.immomanage.dto.userDto.UserDto;
import org.asm.immomanage.models.User;
import org.asm.immomanage.repository.UserRepository;

@Data
public class UserDtoMapper {
    private final UserRepository userRepository;
    public static UserDto toUserDto(User user) {
        return new UserDto(user.getName(), user.getEmail());
    }
    public User toUser(UserDto userDto) {
        return userRepository.findByEmail(userDto.getEmail()).get();
    }
}
