package com.sprinthub.task.dto;

import com.sprinthub.task.TaskStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateTaskStatusRequest {

    @NotNull(message = "Task status is required")
    private TaskStatus status;

    public UpdateTaskStatusRequest() {
    }

    public UpdateTaskStatusRequest(TaskStatus status) {
        this.status = status;
    }

    public TaskStatus getStatus() {
        return status;
    }
}