package com.rewire.auth.auth_app_backend.Dtos;

import java.util.UUID;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {
    
    private UUID id;
    private String name;
    
}
