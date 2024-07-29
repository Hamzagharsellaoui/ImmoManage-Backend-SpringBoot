package org.asm.immomanage.exception;

import org.asm.immomanage.dto.BaseResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<BaseResponseDto<String>> handleUserAlreadyExistsException(UserAlreadyExistsException ex, WebRequest request) {
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.FOUND, ex.getMessage(), false,null), HttpStatus.FOUND);
    }
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<BaseResponseDto<String>> handleInvalidCredentials(InvalidCredentialsException ex, WebRequest request) {
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.UNAUTHORIZED, ex.getMessage(), false,null), HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(NoPropertiesFoundException.class)
    public ResponseEntity<BaseResponseDto<String>> handleNoPropertiesFoundException(NoPropertiesFoundException ex) {
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.NO_CONTENT, ex.getMessage(), true, null), HttpStatus.NO_CONTENT);
    }
    @ExceptionHandler(PropertyAlreadyExistsException.class)
    public ResponseEntity<BaseResponseDto<String>> handlePropertyAlreadyExistsException(PropertyAlreadyExistsException ex) {
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.FOUND, ex.getMessage(), true, null), HttpStatus.FOUND);
    }
    @ExceptionHandler(PropertyNoAvailableException.class)
    public ResponseEntity<BaseResponseDto<String>> handlePropertyNoAvailableException(PropertyNoAvailableException ex) {
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.FOUND, ex.getMessage(), true, null), HttpStatus.FOUND);
    }
    @ExceptionHandler(NoTenantsFoundException.class)
    public ResponseEntity<BaseResponseDto<String>> handleNoTenantsFoundException(NoTenantsFoundException ex) {
        return new ResponseEntity<>(new BaseResponseDto<>(HttpStatus.NO_CONTENT, ex.getMessage(), true, null), HttpStatus.NO_CONTENT);
    }
}
