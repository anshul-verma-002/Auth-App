package com.rewire.auth.auth_app_backend.Security;

import com.rewire.auth.auth_app_backend.Models.User;
import com.rewire.auth.auth_app_backend.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user =  userRepository.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("User Name Not found"));
       return user;
    }
}
