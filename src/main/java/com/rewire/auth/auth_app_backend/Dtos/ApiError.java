package com.rewire.auth.auth_app_backend.Dtos;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

import org.springframework.http.HttpStatus;

public record ApiError(
    int status,
    String error,
    String message,
    String path,
    OffsetDateTime timestamp
) {

    public static ApiError of(int  status, String error, String message, String path) {
        return new ApiError(status, error, message, path, OffsetDateTime.now(ZoneOffset.UTC));
    }
}
