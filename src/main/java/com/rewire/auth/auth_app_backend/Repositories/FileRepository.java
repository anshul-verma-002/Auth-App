package com.rewire.auth.auth_app_backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rewire.auth.auth_app_backend.Models.FileEntity;
import com.rewire.auth.auth_app_backend.Models.User;

import java.util.List;


public interface FileRepository extends JpaRepository<FileEntity, Long>{
    
    List<FileEntity> findByUser(User user);
}
