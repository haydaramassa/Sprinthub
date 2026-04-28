package com.sprinthub.task;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    private UUID id;

    @Column(nullable = false)
    private UUID projectId;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TaskStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TaskPriority priority;

    @Column(nullable = false)
    private Instant createdAt;

    public Task() {
    }

    public Task(UUID id, UUID projectId, String title, String description,
                TaskStatus status, TaskPriority priority, Instant createdAt) {
        this.id = id;
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
    }

    public static Task create(UUID projectId, String title, String description, TaskPriority priority) {
        return new Task(
                UUID.randomUUID(),
                projectId,
                title,
                description,
                TaskStatus.TODO,
                priority,
                Instant.now()
        );
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

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}