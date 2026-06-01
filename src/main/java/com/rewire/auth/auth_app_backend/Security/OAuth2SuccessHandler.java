package com.rewire.auth.auth_app_backend.Security;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.rewire.auth.auth_app_backend.Models.Provider;
import com.rewire.auth.auth_app_backend.Models.RefreshToken;
import com.rewire.auth.auth_app_backend.Models.User;
import com.rewire.auth.auth_app_backend.Repositories.RefreshTokenRepository;
import com.rewire.auth.auth_app_backend.Repositories.UserRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CookieService cookieService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${app.auth.frontend.success-redirect}")
    private String frontendSuccessUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        logger.info("Successfull Authentication");
        logger.info(authentication.toString());

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // Identify User

        String registrationId = "unknown";

        if (authentication instanceof OAuth2AuthenticationToken token) {
            registrationId = token.getAuthorizedClientRegistrationId();
        }

        logger.info("Registration Id : " + registrationId);
        logger.info("User : " + oAuth2User.getAttributes().toString());

        User user;

        switch (registrationId) {
            case "google" -> {
                String googleId = oAuth2User.getAttributes().getOrDefault("sub", " ").toString();
                String email = oAuth2User.getAttributes().getOrDefault("email", " ").toString();
                String name = oAuth2User.getAttributes().getOrDefault("name", " ").toString();
                String picture = oAuth2User.getAttributes().getOrDefault("picture", " ").toString();
                User newUser = User.builder()
                        .name(name)
                        .email(email)
                        .enable(true)
                        .image(picture)
                        .provider(Provider.GOOGLE)
                        .providerId(googleId)
                        .build();

                user = userRepository.findByEmail(email).orElseGet(()-> userRepository.save(newUser));
                }

                case "github" ->{

                    String name = oAuth2User.getAttributes().getOrDefault("login", " ").toString();
                    String githubId = oAuth2User.getAttributes().getOrDefault("id", " ").toString();
                    String image = oAuth2User.getAttributes().getOrDefault("avatar_url", " ").toString();


                    String email = (String) oAuth2User.getAttributes().get("email");
                    if(email == null){
                        email = name + "@gmail.com";
                    }

                    User newUser = User.builder()
                        .name(name)
                        .email(email)
                        .enable(true)
                        .image(image)
                        .provider(Provider.GITHUB)
                        .providerId(githubId)
                        .build();
                user = userRepository.findByEmail(email).orElseGet(()-> userRepository.save(newUser));
                        
                }

            default -> {
                throw new RuntimeException("Invalid Registration Id ");
            }

        }

        // Now we will make refresh Token

        String jti = UUID.randomUUID().toString();
        RefreshToken refreshTokenOb = RefreshToken.builder()
                .user(user)
                .jti(jti)
                .revoked(false)
                .createdAt(Instant.now())
                .expiresAt(Instant.now()
                        .plusSeconds(jwtService.getRefreshTtlSeconds()))
                .build();

        refreshTokenRepository.save(refreshTokenOb);

        String refreshToken = jwtService.generateRefreshToken(user, refreshTokenOb.getJti());

        cookieService.attachRefreshCookie(response, refreshToken, (int)jwtService.getRefreshTtlSeconds());


        response.sendRedirect(frontendSuccessUrl);
    }

}
