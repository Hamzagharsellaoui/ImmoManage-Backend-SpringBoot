package org.asm.immomanage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponseDto<T> {
    private HttpStatus status;
    private String message;
    private boolean error;
    private T data;
}
