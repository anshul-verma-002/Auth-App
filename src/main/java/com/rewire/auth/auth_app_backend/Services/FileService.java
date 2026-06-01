package com.rewire.auth.auth_app_backend.Services;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.rewire.auth.auth_app_backend.Models.FileEntity;
import com.rewire.auth.auth_app_backend.Models.User;
import com.rewire.auth.auth_app_backend.Repositories.FileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileService {

    private final Cloudinary cloudinary;
    private final FileRepository fileRepository;

    public FileEntity uploadFile(MultipartFile file, User
         user) throws IOException {

        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.emptyMap()
        );

        FileEntity fileEntity = new FileEntity();

        fileEntity.setFileName(file.getOriginalFilename());
        fileEntity.setFileType(file.getContentType());
        fileEntity.setFileSize(file.getSize());
        fileEntity.setUploadedAt(LocalDateTime.now());

        fileEntity.setFileUrl(uploadResult.get("url").toString());
        fileEntity.setPublicId(uploadResult.get("public_id").toString());

        fileEntity.setUser(user);

        return fileRepository.save(fileEntity);
    }
}
