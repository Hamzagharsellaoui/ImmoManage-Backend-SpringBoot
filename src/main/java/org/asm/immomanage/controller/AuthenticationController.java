package org.asm.immomanage.controller;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.authenticationDto.AuthenticationResponse;
import org.asm.immomanage.dto.authenticationDto.RegisterRequestDto;
import org.asm.immomanage.dto.BaseResponseDto;
import org.asm.immomanage.dto.authenticationDto.LoginRequestDto;
import org.asm.immomanage.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/User")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IUserService userService;

    @PostMapping("/login")
    public ResponseEntity<BaseResponseDto<AuthenticationResponse>> loginUser(@Valid @RequestBody LoginRequestDto request) {
            return ResponseEntity.ok(new BaseResponseDto<>(HttpStatus.OK, "Login successful", false,userService.loginUserService(request)));

    }
    @PostMapping("/Register")
    public ResponseEntity<BaseResponseDto<String>> registerUser(@Valid @RequestBody RegisterRequestDto request , HttpServletResponse response) {
        response.setHeader("Activation-Token", userService.registerUserService(request));
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.CREATED, "Registration successful", false, null), HttpStatus.CREATED);
    }
}
