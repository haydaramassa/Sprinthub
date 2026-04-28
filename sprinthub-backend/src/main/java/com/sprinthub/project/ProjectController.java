package com.sprinthub.project;

import com.sprinthub.project.dto.CreateProjectRequest;
import com.sprinthub.project.dto.ProjectResponse;
import com.sprinthub.project.dto.UpdateProjectRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/api/workspaces/{workspaceId}/projects")
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectResponse createProject(
            @PathVariable UUID workspaceId,
            @Valid @RequestBody CreateProjectRequest request
    ) {
        Project project = projectService.createProject(
                workspaceId,
                request.getName(),
                request.getDescription()
        );

        return toResponse(project);
    }

    @GetMapping("/api/workspaces/{workspaceId}/projects")
    public List<ProjectResponse> getProjectsByWorkspaceId(@PathVariable UUID workspaceId) {
        return projectService.getProjectsByWorkspaceId(workspaceId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/api/projects/{projectId}")
    public ProjectResponse getProjectById(@PathVariable UUID projectId) {
        Project project = projectService.getProjectById(projectId);
        return toResponse(project);
    }

    private ProjectResponse toResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getWorkspaceId(),
                project.getName(),
                project.getDescription(),
                project.getCreatedAt()
        );
    }

    @PutMapping("/api/projects/{projectId}")
    public ProjectResponse updateProject(
            @PathVariable UUID projectId,
            @Valid @RequestBody UpdateProjectRequest request
    ) {
        Project project = projectService.updateProject(
                projectId,
                request.getName(),
                request.getDescription()
        );

        return toResponse(project);
    }

    @DeleteMapping("/api/projects/{projectId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProject(@PathVariable UUID projectId) {
        projectService.deleteProject(projectId);
    }

}