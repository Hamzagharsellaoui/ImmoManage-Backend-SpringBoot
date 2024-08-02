package org.asm.immomanage.controller;

import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.BaseResponseDto;
import org.asm.immomanage.dto.authenticationDto.UserInfoResponse;
import org.asm.immomanage.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/User")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/info/{id}")
    public ResponseEntity<BaseResponseDto<UserInfoResponse>> getUserInfo(@PathVariable long id)  {
        return ResponseEntity.ok(new BaseResponseDto<>(HttpStatus.OK, "User info retreived successfully", false, userService.loadUserInfo(id)));
    }
}
