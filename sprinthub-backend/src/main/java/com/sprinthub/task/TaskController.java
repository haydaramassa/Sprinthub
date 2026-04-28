package com.sprinthub.task;

import com.sprinthub.task.dto.CreateTaskRequest;
import com.sprinthub.task.dto.TaskResponse;
import com.sprinthub.task.dto.UpdateTaskRequest;
import com.sprinthub.task.dto.UpdateTaskStatusRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/api/projects/{projectId}/tasks")
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponse createTask(
            @PathVariable UUID projectId,
            @Valid @RequestBody CreateTaskRequest request
    ) {
        Task task = taskService.createTask(
                projectId,
                request.getTitle(),
                request.getDescription(),
                request.getPriority()
        );

        return toResponse(task);
    }

    @GetMapping("/api/projects/{projectId}/tasks")
    public List<TaskResponse> getTasksByProjectId(
            @PathVariable UUID projectId,
            @RequestParam(required = false) TaskStatus status
    ) {
        List<Task> tasks;

        if (status == null) {
            tasks = taskService.getTasksByProjectId(projectId);
        } else {
            tasks = taskService.getTasksByProjectIdAndStatus(projectId, status);
        }

        return tasks.stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/api/tasks/{taskId}")
    public TaskResponse getTaskById(@PathVariable UUID taskId) {
        Task task = taskService.getTaskById(taskId);
        return toResponse(task);
    }

    @PatchMapping("/api/tasks/{taskId}/status")
    public TaskResponse updateTaskStatus(
            @PathVariable UUID taskId,
            @Valid @RequestBody UpdateTaskStatusRequest request
    ) {
        Task task = taskService.updateTaskStatus(
                taskId,
                request.getStatus()
        );

        return toResponse(task);
    }

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getProjectId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getCreatedAt()
        );
    }
    @DeleteMapping("/api/tasks/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable UUID taskId) {
        taskService.deleteTask(taskId);
    }

    @PutMapping("/api/tasks/{taskId}")
    public TaskResponse updateTask(
            @PathVariable UUID taskId,
            @Valid @RequestBody UpdateTaskRequest request
    ) {
        Task task = taskService.updateTask(
                taskId,
                request.getTitle(),
                request.getDescription(),
                request.getPriority()
        );

        return toResponse(task);
    }

}