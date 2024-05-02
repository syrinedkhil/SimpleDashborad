package com.example.Dashboard.controller;

import com.example.Dashboard.dto.JwtAuthenticationResponse;
import com.example.Dashboard.dto.SignInRequest;
import com.example.Dashboard.dto.SignUpRequest;
import com.example.Dashboard.model.Role;
import com.example.Dashboard.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public JwtAuthenticationResponse signup(@RequestBody SignUpRequest request) {
         return authenticationService.signup(request);
    }

    @PostMapping("/signin")
    public JwtAuthenticationResponse signin(@RequestBody SignInRequest request) {
        return authenticationService.signin(request);
    }
}