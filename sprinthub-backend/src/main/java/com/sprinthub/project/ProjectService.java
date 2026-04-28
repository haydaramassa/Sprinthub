package com.sprinthub.project;

import com.sprinthub.project.exception.ProjectNotFoundException;
import com.sprinthub.task.TaskRepository;
import com.sprinthub.workspace.WorkspaceService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final WorkspaceService workspaceService;
    private final TaskRepository taskRepository;

    public ProjectService(
            ProjectRepository projectRepository,
            WorkspaceService workspaceService,
            TaskRepository taskRepository
    ) {
        this.projectRepository = projectRepository;
        this.workspaceService = workspaceService;
        this.taskRepository = taskRepository;
    }

    public Project createProject(UUID workspaceId, String name, String description) {
        workspaceService.getWorkspaceById(workspaceId);

        Project project = Project.create(workspaceId, name, description);

        return projectRepository.save(project);
    }

    public List<Project> getProjectsByWorkspaceId(UUID workspaceId) {
        workspaceService.getWorkspaceById(workspaceId);

        return projectRepository.findByWorkspaceId(workspaceId);
    }

    public Project getProjectById(UUID projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new ProjectNotFoundException("Project not found"));
    }

    public Project updateProject(UUID projectId, String name, String description) {
        Project project = getProjectById(projectId);

        project.setName(name);
        project.setDescription(description);

        return projectRepository.save(project);
    }

    @Transactional
    public void deleteProject(UUID projectId) {
        Project project = getProjectById(projectId);

        taskRepository.deleteByProjectId(projectId);

        projectRepository.delete(project);
    }
}