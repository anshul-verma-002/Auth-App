package com.rewire.auth.auth_app_backend.Services;

import com.rewire.auth.auth_app_backend.Dtos.UserDto;

public interface UserService {

    UserDto createUser (UserDto userDto);

    UserDto updateUser(UserDto userDto, String userId);
    
    UserDto getUserByEmail(String email);

    UserDto getUserById(String userId);

    String deleteUser(String userId);

    Iterable<UserDto> getAllUsers();

}
