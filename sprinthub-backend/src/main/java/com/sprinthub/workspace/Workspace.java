package com.sprinthub.workspace;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "workspaces")
public class Workspace {

    @Id
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private UUID ownerId;

    @Column(nullable = false)
    private Instant createdAt;

    public Workspace() {
    }

    public Workspace(UUID id, String name, String description, UUID ownerId, Instant createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
    }

    public static Workspace create(String name, String description, UUID ownerId) {
        return new Workspace(
                UUID.randomUUID(),
                name,
                description,
                ownerId,
                Instant.now()
        );
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public UUID getOwnerId() {
        return ownerId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}