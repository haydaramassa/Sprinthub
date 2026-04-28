package com.sprinthub.workspace.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public class CreateWorkspaceRequest {

    @NotBlank(message = "Workspace name is required")
    @Size(min = 2, max = 100, message = "Workspace name must be between 2 and 100 characters")
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    private String description;

    private UUID ownerId;

    public CreateWorkspaceRequest() {
    }

    public CreateWorkspaceRequest(String name, String description, UUID ownerId) {
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
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
}