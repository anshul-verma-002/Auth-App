package com.rewire.auth.auth_app_backend.Dtos;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.rewire.auth.auth_app_backend.Models.Provider;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
   
    private UUID id;
    private String specialName;
    private String bio;
    private String email;
    private String name;
    private String password;
    private String image;
    private Boolean enable = true;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();

    private Provider provider = Provider.LOCAL;
    private Set<RoleDto> roles = new HashSet<>();

}
