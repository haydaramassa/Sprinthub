package com.sprinthub.task.dto;

import com.sprinthub.task.TaskPriority;
import com.sprinthub.task.TaskStatus;

import java.time.Instant;
import java.util.UUID;

public class TaskResponse {

    private UUID id;
    private UUID projectId;
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private Instant createdAt;

    public TaskResponse() {
    }

    public TaskResponse(UUID id, UUID projectId, String title, String description,
                        TaskStatus status, TaskPriority priority, Instant createdAt) {
        this.id = id;
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
    }

    public UUID getId() {
        return id;
    }

    public UUID getProjectId() {
        return projectId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}