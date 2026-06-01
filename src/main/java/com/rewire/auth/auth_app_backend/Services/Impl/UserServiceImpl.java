package com.rewire.auth.auth_app_backend.Services.Impl;

import com.rewire.auth.auth_app_backend.Helpers.UserHelper;
import com.rewire.auth.auth_app_backend.Models.Provider;
import com.rewire.auth.auth_app_backend.Services.UserService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.rewire.auth.auth_app_backend.Dtos.UserDto;
import com.rewire.auth.auth_app_backend.Models.User;
import com.rewire.auth.auth_app_backend.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public UserDto createUser(UserDto userDto) {

        if (userDto.getEmail() == null || userDto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is Blank");
        }

        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalArgumentException("Email already Exists");
        }

        User user = modelMapper.map(userDto, User.class);
        user.setProvider(userDto.getProvider() != null ? userDto.getProvider() : Provider.LOCAL);
        user.setEnable(true);
        User savedUser = userRepository.save(user);

        return modelMapper.map(user, UserDto.class);
    }

    // ----------------- update User
    @Override
    public UserDto updateUser(UserDto userDto, String email) {
        User existingUser = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found !!"));
        if (userDto.getName() != null &&
                !userDto.getName().trim().isEmpty()) {
            existingUser.setName(userDto.getName());
        }
        if (userDto.getBio() != null &&
                !userDto.getBio().trim().isEmpty()) {
            existingUser.setBio(userDto.getBio());
        }
        if (userDto.getSpecialName() != null &&
                !userDto.getSpecialName().trim().isEmpty()) {
            existingUser.setSpecialName(userDto.getSpecialName());
        }
        existingUser.setUpdatedAt(Instant.now());
        User updatedUser = userRepository.save(existingUser);
        return modelMapper.map(updatedUser, UserDto.class);
    }

    // ------------------- get User By Email
    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Resource Not Found"));
        return modelMapper.map(user, UserDto.class);
    }

    // ----------------------- get User by id
    @Override
    public UserDto getUserById(String userId) {
        UUID uid = UserHelper.parseUUID(userId);
        User user = userRepository.findById(uid)
                .orElseThrow(() -> new RuntimeException("User With ID " + userId + " not found "));
        return modelMapper.map(user, UserDto.class);
    }

    // ----------------------- delete user
    @Override
    @Transactional
    public String deleteUser(String userId) {
        UUID uid = UserHelper.parseUUID(userId);
        User user = userRepository.findById(uid)
                .orElseThrow(() -> new RuntimeException("User With ID " + userId + "  not found"));
        userRepository.delete(user);
        return "User with id " + userId + " and Name " + user.getName() + " has been deleted ";
    }

    // ---------------------- get all users
    @Override
    public Iterable<UserDto> getAllUsers() {
        return userRepository
                .findAll().stream()
                .map(user -> modelMapper.map(user, UserDto.class)).toList();
    }

}
