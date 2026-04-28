package com.sprinthub.workspace.dto;

import java.time.Instant;
import java.util.UUID;

public class WorkspaceResponse {

    private UUID id;
    private String name;
    private String description;
    private UUID ownerId;
    private Instant createdAt;

    public WorkspaceResponse() {
    }

    public WorkspaceResponse(UUID id, String name, String description, UUID ownerId, Instant createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
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