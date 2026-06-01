package com.rewire.auth.auth_app_backend.Configs;

import com.rewire.auth.auth_app_backend.Security.JwtAuthenticationFilter;
import com.rewire.auth.auth_app_backend.Security.OAuth2SuccessHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rewire.auth.auth_app_backend.Security.CustomUserDetailService;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Autowired
    private OAuth2SuccessHandler auth2SuccessHandler;
    
    @Autowired
    private CustomUserDetailService customUserDetailService;


    @Bean CorsConfigurationSource corsConfigurationSource(
        @Value("${app.cors.front-end-url}") String corsURls
    ){
        String[] cors = corsURls.trim().split(",");
        var config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(cors));
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS","PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
    
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(customUserDetailService);
        
        authProvider.setPasswordEncoder(passwordEncoder());
        
        return authProvider;
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(Customizer.withDefaults())
        .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/api/v1/auth/register").permitAll()
            .requestMatchers("/api/v1/auth/login").permitAll()
            .requestMatchers("/api/v1/auth/refresh").permitAll()
            .requestMatchers("/api/v1/auth/logout").permitAll()
            .requestMatchers("/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**").permitAll()
            .anyRequest().authenticated())
            
            .oauth2Login(oauth2 -> oauth2.successHandler(auth2SuccessHandler)
            .failureHandler(null)
            
        )
        .logout(AbstractHttpConfigurer::disable)
        .exceptionHandling(ex -> ex.authenticationEntryPoint((request, response, authException) -> {
            
            // error message
            authException.printStackTrace();
            response.setStatus(401);
            response.setContentType("application/json");
            String message = authException.getMessage();
            
            Map<String, String> errorMessage = Map.of("message", message, "statusCode", Integer.toString(401));
            
            var objectMapper = new ObjectMapper();
            response.getWriter().write(objectMapper.writeValueAsString(errorMessage));
            
        }))
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    // @Bean
    // public UserDetailsService user(){
    //
    // User.UserBuilder userBuilder = User.withDefaultPasswordEncoder();
    //
    // UserDetails user1 =
    // userBuilder.username("anshul").password("625422").roles("ADMIN").build();
    // UserDetails user2 =
    // userBuilder.username("ayush").password("646422").roles("USER").build();
    // UserDetails user3 =
    // userBuilder.username("ankit").password("625622").roles("USER").build();
    //
    // return new InMemoryUserDetailsManager(user1 , user2, user3);
    // }
    
}
