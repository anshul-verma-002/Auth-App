package com.rewire.auth.auth_app_backend.Dtos;

import org.springframework.http.HttpStatus;

public record ErrorResponse (

    String message,
    HttpStatus status
    )
{

}
