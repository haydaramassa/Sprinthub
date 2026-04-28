package com.sprinthub.task.dto;

import com.sprinthub.task.TaskPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateTaskRequest {

    @NotBlank(message = "Task title is required")
    @Size(min = 2, max = 150, message = "Task title must be between 2 and 150 characters")
    private String title;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    @NotNull(message = "Priority is required")
    private TaskPriority priority;

    public CreateTaskRequest() {
    }

    public CreateTaskRequest(String title, String description, TaskPriority priority) {
        this.title = title;
        this.description = description;
        this.priority = priority;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public TaskPriority getPriority() {
        return priority;
    }
}