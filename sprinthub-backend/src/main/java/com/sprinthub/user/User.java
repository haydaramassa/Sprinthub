package com.sprinthub.user;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    private UUID id;

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Instant createdAt;

    public User() {
    }

    public User(UUID id, String fullName, String email, String password, Instant createdAt) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }

    public static User create(String fullName, String email, String password) {
        return new User(
                UUID.randomUUID(),
                fullName,
                email,
                password,
                Instant.now()
        );
    }

    public UUID getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}