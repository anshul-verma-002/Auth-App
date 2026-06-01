package com.rewire.auth.auth_app_backend.Dtos;

public record LoginRequest(
    String email,
    String password
) {

}
