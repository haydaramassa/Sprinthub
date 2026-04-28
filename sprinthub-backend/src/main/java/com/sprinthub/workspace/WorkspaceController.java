package com.sprinthub.workspace;

import com.sprinthub.workspace.dto.CreateWorkspaceRequest;
import com.sprinthub.workspace.dto.UpdateWorkspaceRequest;
import com.sprinthub.workspace.dto.WorkspaceResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/workspaces")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkspaceResponse createWorkspace(@Valid @RequestBody CreateWorkspaceRequest request) {
        Workspace workspace = workspaceService.createWorkspace(
                request.getName(),
                request.getDescription(),
                request.getOwnerId()
        );

        return toResponse(workspace);
    }

    @GetMapping
    public List<WorkspaceResponse> getAllWorkspaces() {
        return workspaceService.getAllWorkspaces()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public WorkspaceResponse getWorkspaceById(@PathVariable UUID id) {
        Workspace workspace = workspaceService.getWorkspaceById(id);
        return toResponse(workspace);
    }

    private WorkspaceResponse toResponse(Workspace workspace) {
        return new WorkspaceResponse(
                workspace.getId(),
                workspace.getName(),
                workspace.getDescription(),
                workspace.getOwnerId(),
                workspace.getCreatedAt()
        );
    }
    @GetMapping("/user/{userId}")
    public List<WorkspaceResponse> getWorkspacesByUserId(@PathVariable UUID userId) {
        return workspaceService.getWorkspacesByOwnerId(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @PutMapping("{workspaceId}")
    public WorkspaceResponse updateWorkspace(
            @PathVariable UUID workspaceId,
            @Valid @RequestBody UpdateWorkspaceRequest request
    ) {
        Workspace workspace = workspaceService.updateWorkspace(
                workspaceId,
                request.getName(),
                request.getDescription()
        );

        return toResponse(workspace);
    }

    @DeleteMapping("{workspaceId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWorkspace(@PathVariable UUID workspaceId) {
        workspaceService.deleteWorkspace(workspaceId);
    }

}