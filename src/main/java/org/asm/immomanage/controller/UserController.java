package org.asm.immomanage.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.BaseResponseDto;
import org.asm.immomanage.dto.authenticationDto.UserInfoRequest;
import org.asm.immomanage.dto.authenticationDto.UserInfoResponse;
import org.asm.immomanage.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/User")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;




    @GetMapping("/info")
    public ResponseEntity<BaseResponseDto<UserInfoResponse>> getUserInfo(@Valid @RequestParam UserInfoRequest userInfoRequest)  {
        return ResponseEntity.ok(new BaseResponseDto<>(HttpStatus.OK, "User info retreived successfully", false, userService.loadUserInfo(userInfoRequest)));
    }
}
