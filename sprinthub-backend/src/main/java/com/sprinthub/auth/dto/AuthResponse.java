package com.sprinthub.auth.dto;

import java.time.Instant;
import java.util.UUID;

public class AuthResponse {

    private String message;
    private String token;
    private UUID userId;
    private String fullName;
    private String email;
    private Instant createdAt;

    public AuthResponse() {
    }

    public AuthResponse(
            String message,
            String token,
            UUID userId,
            String fullName,
            String email,
            Instant createdAt
    ) {
        this.message = message;
        this.token = token;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.createdAt = createdAt;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}