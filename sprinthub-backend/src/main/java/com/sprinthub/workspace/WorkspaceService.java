package com.sprinthub.workspace;

import com.sprinthub.project.Project;
import com.sprinthub.project.ProjectRepository;
import com.sprinthub.task.TaskRepository;
import com.sprinthub.workspace.exception.WorkspaceNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public WorkspaceService(
            WorkspaceRepository workspaceRepository,
            ProjectRepository projectRepository,
            TaskRepository taskRepository
    ) {
        this.workspaceRepository = workspaceRepository;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    public Workspace createWorkspace(String name, String description, UUID ownerId) {
        Workspace workspace = Workspace.create(name, description, ownerId);
        return workspaceRepository.save(workspace);
    }

    public List<Workspace> getAllWorkspaces() {
        return workspaceRepository.findAll();
    }

    public Workspace getWorkspaceById(UUID id) {
        return workspaceRepository.findById(id)
                .orElseThrow(() -> new WorkspaceNotFoundException("Workspace not found"));
    }

    public List<Workspace> getWorkspacesByOwnerId(UUID ownerId) {
        return workspaceRepository.findByOwnerId(ownerId);
    }

    public Workspace updateWorkspace(UUID workspaceId, String name, String description) {
        Workspace workspace = getWorkspaceById(workspaceId);

        workspace.setName(name);
        workspace.setDescription(description);

        return workspaceRepository.save(workspace);
    }

    @Transactional
    public void deleteWorkspace(UUID workspaceId) {
        Workspace workspace = getWorkspaceById(workspaceId);

        List<Project> projects = projectRepository.findByWorkspaceId(workspaceId);

        for (Project project : projects) {
            taskRepository.deleteByProjectId(project.getId());
        }

        projectRepository.deleteByWorkspaceId(workspaceId);

        workspaceRepository.delete(workspace);
    }
}