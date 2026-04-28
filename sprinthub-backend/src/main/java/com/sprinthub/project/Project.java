package com.sprinthub.project;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    private UUID id;

    @Column(nullable = false)
    private UUID workspaceId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @Column(nullable = false)
    private Instant createdAt;

    public Project() {
    }

    public Project(UUID id, UUID workspaceId, String name, String description, Instant createdAt) {
        this.id = id;
        this.workspaceId = workspaceId;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
    }

    public static Project create(UUID workspaceId, String name, String description) {
        return new Project(
                UUID.randomUUID(),
                workspaceId,
                name,
                description,
                Instant.now()
        );
    }

    public UUID getId() {
        return id;
    }

    public UUID getWorkspaceId() {
        return workspaceId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}