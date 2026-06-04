package com.rewire.auth.auth_app_backend.Controllers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1")
@RestController
public class HealthController {

    @GetMapping("/health")
    public String health() {
        return "Application is running";
    }
}