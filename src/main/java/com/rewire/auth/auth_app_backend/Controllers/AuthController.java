package com.rewire.auth.auth_app_backend.Controllers;

import com.rewire.auth.auth_app_backend.Dtos.LoginRequest;
import com.rewire.auth.auth_app_backend.Dtos.RefreshTokenRequest;
import com.rewire.auth.auth_app_backend.Dtos.TokenResponse;
import com.rewire.auth.auth_app_backend.Dtos.UserDto;
import com.rewire.auth.auth_app_backend.Models.RefreshToken;
import com.rewire.auth.auth_app_backend.Models.User;
import com.rewire.auth.auth_app_backend.Repositories.RefreshTokenRepository;
import com.rewire.auth.auth_app_backend.Repositories.UserRepository;
import com.rewire.auth.auth_app_backend.Security.CookieService;
import com.rewire.auth.auth_app_backend.Security.JwtService;
import com.rewire.auth.auth_app_backend.Services.AuthService;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import java.time.Instant;
import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;


import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final ModelMapper mapper;
    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieService cookieService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {

        authenticate(loginRequest);
        User user = userRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new BadCredentialsException("Invalid Username or Passowrd"));

        if (!user.isEnable()) {
            throw new DisabledException("User is Disabled");
        }

        // for refresh Token

        String jti = UUID.randomUUID().toString();
        var refreshTokenOb = RefreshToken.builder()
                .jti(jti)
                .user(user)
                .createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .revoked(false)
                .build();

        // refresh token saved

        refreshTokenRepository.save(refreshTokenOb);

        // generate token
        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user, refreshTokenOb.getJti());

        // use cookie service to attach reresh token in cookie
        cookieService.attachRefreshCookie(response, refreshToken, (int) jwtService.getRefreshTtlSeconds());
        cookieService.addNoStoreHeaders(response);

        TokenResponse tokenResponse = TokenResponse.of(accessToken, refreshToken, jwtService.getAccessTtlSeconds(),
                mapper.map(user, UserDto.class));
        return ResponseEntity.ok(tokenResponse);

    }

    // autheticate the user

    public Authentication authenticate(LoginRequest loginRequest) {
        try {
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }


    // access aur refresh token ko renew karne k liye

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refreshToken(
        @RequestBody(required = false ) RefreshTokenRequest body,
        HttpServletResponse response,
        HttpServletRequest request
    ){

        String refreshToken = readRefreshTokenFromRequest(body, request).orElseThrow(()-> new BadCredentialsException("Invalid Refresh Token"));

        if(!jwtService.isRefreshToken(refreshToken)){
            throw new BadCredentialsException("Inavlid Refresh Token Type");
        }

        String jti = jwtService.getJti(refreshToken);
        UUID userID  = jwtService.getUserId(refreshToken);

        RefreshToken storedRefreshToken = refreshTokenRepository.findByJti(jti).orElseThrow(()-> new BadCredentialsException("Refresh Token Not recognized"));

        if(storedRefreshToken.isRevoked()){
            throw new BadCredentialsException("Refresh Token expired or revoked");
        }

        if(storedRefreshToken.getExpiresAt().isBefore(Instant.now())){
            throw new BadCredentialsException("Refresh token Expired");

        }

        if(!storedRefreshToken.getUser().getId().equals(userID)){
            throw new BadCredentialsException("RefreshTokwn Does not belong to this user");
        }


        storedRefreshToken.setRevoked(true);
        String Jti = UUID.randomUUID().toString();
        storedRefreshToken.setReplacedByToken(Jti);
        refreshTokenRepository.save(storedRefreshToken);

        User user = storedRefreshToken.getUser();

        var newRefreshTokenob = RefreshToken.builder()
                    .jti(Jti)
                    .user(user)
                    .createdAt(Instant.now())
                    .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                    .revoked(false)
                    .build();

        refreshTokenRepository.save(newRefreshTokenob);
        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user,newRefreshTokenob.getJti());
        cookieService.attachRefreshCookie(response, newRefreshToken, (int) jwtService.getRefreshTtlSeconds());
        cookieService.addNoStoreHeaders(response);

        return ResponseEntity.ok(TokenResponse.of(newAccessToken, newRefreshToken, jwtService.getAccessTtlSeconds(), mapper.map(user, UserDto.class)));


    }

    private Optional<String> readRefreshTokenFromRequest(RefreshTokenRequest body, HttpServletRequest request) {
        // prefer reading refrsh token from cookie 

        if(request.getCookies() != null ){
            Optional<String> fromCookie = Arrays.stream(
                request.getCookies()
            ).filter(c-> cookieService.getRefreshTokenCookieName().equals(c.getName())).map(Cookie::getValue)
            .filter(v-> !v.isBlank())
            .findFirst();

            if(fromCookie.isPresent()){
                return fromCookie;
            }
        }

        // from body 

        if(body != null && body.refreshToken()!= null && !body.refreshToken().isBlank()){
            return Optional.of(body.refreshToken());
        }

        // custom headers 

        // Authorization: bearer

        return Optional.empty();
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(userDto));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response){
        readRefreshTokenFromRequest(null, request).ifPresent(token -> {
            try{
                if(jwtService.isRefreshToken(token)){
                    String jti = jwtService.getJti(token);
                    refreshTokenRepository.findByJti(token).ifPresent(rt-> {
                        rt.setRevoked(true);
                        refreshTokenRepository.save(rt);
                    });
                }
            }catch(JwtException e){

            }
        });

        cookieService.clearRefreshCookie(response);
        cookieService.addNoStoreHeaders(response);
        SecurityContextHolder.clearContext();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
