package io.marutsuki.asmallworld.games;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GameExceptionHandler {

    @ExceptionHandler({ WorldNotFoundException.class, PlayerNotFoundException.class })
    public ResponseEntity<?> handleGameException(Exception ex) {
        return new ResponseEntity<>("Resource not found: " + ex.getMessage(), new HttpHeaders(), HttpStatus.NOT_FOUND);
    }

}
