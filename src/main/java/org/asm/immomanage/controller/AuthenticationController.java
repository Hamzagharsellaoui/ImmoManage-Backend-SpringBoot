package org.asm.immomanage.controller;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.asm.immomanage.dto.authenticationDto.*;
import org.asm.immomanage.dto.BaseResponseDto;
import org.asm.immomanage.service.IAuthenticationService;
import org.asm.immomanage.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final IAuthenticationService authenticationService;


    @PostMapping("/login")
    public ResponseEntity<BaseResponseDto<AuthenticationResponse>> loginUser(@Valid @RequestBody LoginRequestDto request) {
            return ResponseEntity.ok(new BaseResponseDto<>(HttpStatus.OK, "Login successful", false,authenticationService.loginUserService(request)));
    }
    @PostMapping("/Register")
    public ResponseEntity<BaseResponseDto<String>> registerUser(@Valid @RequestBody RegisterRequestDto request , HttpServletResponse response) {
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.CREATED, "Registration successful", false, null), HttpStatus.CREATED);
    }

}
