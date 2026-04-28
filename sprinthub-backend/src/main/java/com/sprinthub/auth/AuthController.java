package com.sprinthub.auth;

import com.sprinthub.auth.dto.AuthResponse;
import com.sprinthub.auth.dto.LoginRequest;
import com.sprinthub.auth.dto.RegisterRequest;
import com.sprinthub.security.JwtService;
import com.sprinthub.user.User;
import com.sprinthub.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        User user = userService.createUser(
                request.getFullName(),
                request.getEmail(),
                request.getPassword()
        );

        return new AuthResponse(
                "Account registered successfully",
                null,
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        User user = userService.login(
                request.getEmail(),
                request.getPassword()
        );

        String token = jwtService.generateToken(user.getId(), user.getEmail());

        return new AuthResponse(
                "Login successful",
                token,
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }
}