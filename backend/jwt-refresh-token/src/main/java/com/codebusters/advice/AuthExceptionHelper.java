package com.codebusters.advice;


import com.codebusters.exception.ErrorResponse;
import com.codebusters.exception.UserAlreadyExists;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AuthExceptionHelper {

    @ExceptionHandler(UserAlreadyExists.class)
    public ResponseEntity<ErrorResponse> userAlreadyExists(UserAlreadyExists userAlreadyExists){

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorResponse.builder()
                .error(userAlreadyExists.getMessage())
                .build());
    }
}
