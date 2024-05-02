package com.example.Dashboard.services;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Dashboard.dto.JwtAuthenticationResponse;
import com.example.Dashboard.dto.SignInRequest;
import com.example.Dashboard.dto.SignUpRequest;
import com.example.Dashboard.model.Role;
import com.example.Dashboard.model.User;
import com.example.Dashboard.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserRepository userRepository;
  private final UserService userService;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

    public JwtAuthenticationResponse signup(SignUpRequest request) {
        try {
            var user = User.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.valueOf(request.getRole()))
                    .build();

            user = userService.save(user);

            var jwt = jwtService.generateToken(user);
            return JwtAuthenticationResponse.builder().token(jwt).build();
        } catch (DataIntegrityViolationException e) {
            // Log the error
            System.out.println("Error during signup: " + e.getMessage());

             if (e.getMessage().contains("uk6dotkott2kjsp8vw4d0m25fb7")) {
                throw new RuntimeException("This email address is already registered.");
            } else {
                throw new RuntimeException("Failed to sign up. Please try again.");
            }
        } catch (Exception e) {
             System.out.println("Error during signup: " + e.getMessage());

             throw new RuntimeException("Failed to sign up. Please try again.");
        }

    }


  public JwtAuthenticationResponse signin(SignInRequest request) {
      authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
      var user = userRepository.findByEmail(request.getEmail())
              .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
      var jwt = jwtService.generateToken(user);
      var role = user.getRole();
      return new JwtAuthenticationResponse(jwt, role);
  }
}
