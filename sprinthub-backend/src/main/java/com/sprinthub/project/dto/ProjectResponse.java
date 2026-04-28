package com.sprinthub.project.dto;

import java.time.Instant;
import java.util.UUID;

public class ProjectResponse {

    private UUID id;
    private UUID workspaceId;
    private String name;
    private String description;
    private Instant createdAt;

    public ProjectResponse() {
    }

    public ProjectResponse(UUID id, UUID workspaceId, String name, String description, Instant createdAt) {
        this.id = id;
        this.workspaceId = workspaceId;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
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
}