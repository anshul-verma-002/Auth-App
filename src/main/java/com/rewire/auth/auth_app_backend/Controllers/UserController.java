package com.rewire.auth.auth_app_backend.Controllers;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.rewire.auth.auth_app_backend.Configs.CloudinaryConfig;
import com.rewire.auth.auth_app_backend.Dtos.UserDto;
import com.rewire.auth.auth_app_backend.Models.FileEntity;
import com.rewire.auth.auth_app_backend.Models.User;
import com.rewire.auth.auth_app_backend.Repositories.UserRepository;
import com.rewire.auth.auth_app_backend.Services.FileService;
import com.rewire.auth.auth_app_backend.Services.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {

   private final UserService userService;
   private final UserRepository userRepository;
   private final Cloudinary cloudinary;
   private final FileService fileService;

   @PostMapping("/create")
   public ResponseEntity<UserDto> saveUser(@RequestBody UserDto userDto) {
      return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDto));
   }

   @GetMapping()
   public ResponseEntity<Iterable<UserDto>> getAllUsers() {
      return ResponseEntity.ok(userService.getAllUsers());
   }

   @GetMapping("/email/{email}")
   public ResponseEntity<UserDto> findByEmail(@PathVariable("email") String email) {
      return ResponseEntity.ok(userService.getUserByEmail(email));
   }

   @GetMapping("/id/{uid}")
   public ResponseEntity<UserDto> findById(@PathVariable String uid) {
      return ResponseEntity.ok(userService.getUserById(uid));
   }

   @PutMapping("/update")
   public ResponseEntity<?> updateUser(
         @RequestBody UserDto request,
         Authentication authentication) {
      String email = authentication.getName();
      UserDto updatedUser = userService.updateUser(request, email);
      return ResponseEntity.ok(updatedUser);
   }

   @DeleteMapping("/delete/{id}")
   public ResponseEntity<String> deleteUser(@PathVariable("id") String id) {
      return ResponseEntity.ok(userService.deleteUser(id));
   }

   // upload user profile image

   @PostMapping("/upload-image")
   public ResponseEntity<?> uploadImage(
         @RequestParam("image") MultipartFile file,
         Authentication authentication) throws IOException {

      String email = authentication.getName();
      User user = userRepository.findByEmail(email)
            .orElseThrow();
      Map uploadResult = cloudinary.uploader().upload(
            file.getBytes(),
            ObjectUtils.emptyMap());
      String imageUrl = uploadResult.get("url").toString();
      user.setImage(imageUrl);
      userRepository.save(user);
      return ResponseEntity.ok(user);
   }

   // upload file to the app

   @PostMapping("/upload-file")
   public ResponseEntity<?> uploadFile(
         @RequestParam("file") MultipartFile file,
         Authentication authentication) throws IOException {

      String email = authentication.getName();
      User user = userRepository.findByEmail(email).orElseThrow();

      FileEntity savedFile = fileService.uploadFile(file, user);
      return ResponseEntity.ok(savedFile);
   }

}
