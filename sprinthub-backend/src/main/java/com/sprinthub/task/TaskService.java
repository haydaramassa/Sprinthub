package com.sprinthub.task;

import com.sprinthub.project.ProjectService;
import com.sprinthub.task.exception.TaskNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectService projectService;

    public TaskService(TaskRepository taskRepository, ProjectService projectService) {
        this.taskRepository = taskRepository;
        this.projectService = projectService;
    }

    public Task createTask(UUID projectId, String title, String description, TaskPriority priority) {
        projectService.getProjectById(projectId);

        Task task = Task.create(projectId, title, description, priority);

        return taskRepository.save(task);
    }

    public List<Task> getTasksByProjectId(UUID projectId) {
        projectService.getProjectById(projectId);

        return taskRepository.findByProjectId(projectId);
    }

    public List<Task> getTasksByProjectIdAndStatus(UUID projectId, TaskStatus status) {
        projectService.getProjectById(projectId);

        return taskRepository.findByProjectIdAndStatus(projectId, status);
    }

    public Task getTaskById(UUID taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException("Task not found"));
    }

    public Task updateTaskStatus(UUID taskId, TaskStatus status) {
        Task task = getTaskById(taskId);
        task.setStatus(status);

        return taskRepository.save(task);
    }

    public Task updateTask(UUID taskId, String title, String description, TaskPriority priority) {
        Task task = getTaskById(taskId);

        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority);

        return taskRepository.save(task);
    }

    public void deleteTask(UUID taskId) {
        Task task = getTaskById(taskId);
        taskRepository.delete(task);
    }

}