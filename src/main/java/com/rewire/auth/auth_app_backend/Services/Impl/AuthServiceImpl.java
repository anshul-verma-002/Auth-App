package com.rewire.auth.auth_app_backend.Services.Impl;

import com.rewire.auth.auth_app_backend.Dtos.UserDto;
import com.rewire.auth.auth_app_backend.Services.AuthService;
import com.rewire.auth.auth_app_backend.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {


    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto registerUser(UserDto userDto) {

        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        UserDto userDto1 = userService.createUser(userDto);

        return userDto1;
    }
}
