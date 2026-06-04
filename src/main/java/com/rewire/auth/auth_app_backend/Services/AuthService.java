package com.rewire.auth.auth_app_backend.Services;

import com.rewire.auth.auth_app_backend.Dtos.UserDto;

public interface AuthService {

    UserDto registerUser(UserDto userDto);

}
