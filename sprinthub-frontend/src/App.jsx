import { useEffect, useMemo, useState } from "react";
import AuthPage from "./components/AuthPage";
import Sidebar from "./components/Sidebar";
import KanbanBoard from "./components/KanbanBoard";
import { WorkspaceModal, ProjectModal, TaskModal } from "./components/Modals";
import {
  createProject,
  createTask,
  createWorkspace,
  deleteProject,
  deleteTask,
  deleteWorkspace,
  getProjectsByWorkspaceId,
  getTasksByProjectId,
  getWorkspacesByUserId,
  loginUser,
  registerUser,
  updateProject,
  updateTask,
  updateTaskStatus,
  updateWorkspace,
} from "./api";
import "./App.css";


function App() {
  const [authMode, setAuthMode] = useState("login");

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("sprinthub_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [workspaces, setWorkspaces] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  const [dashboardError, setDashboardError] = useState("");
  const [toast, setToast] = useState(null);

  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [workspaceForm, setWorkspaceForm] = useState({
    name: "",
    description: "",
  });
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

  const [editingWorkspace, setEditingWorkspace] = useState(null);
  const [editWorkspaceForm, setEditWorkspaceForm] = useState({
    name: "",
    description: "",
  });
  const [isUpdatingWorkspace, setIsUpdatingWorkspace] = useState(false);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
  });
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const [editingProject, setEditingProject] = useState(null);
  const [editProjectForm, setEditProjectForm] = useState({
    name: "",
    description: "",
  });
  const [isUpdatingProject, setIsUpdatingProject] = useState(false);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  });
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const [editingTask, setEditingTask] = useState(null);
  const [editTaskForm, setEditTaskForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  });
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  const passwordChecks = useMemo(() => {
    return {
      length: form.password.length >= 8,
      uppercase: /[A-Z]/.test(form.password),
      lowercase: /[a-z]/.test(form.password),
      number: /\d/.test(form.password),
      special: /[^A-Za-z0-9]/.test(form.password),
    };
  }, [form.password]);

  const isStrongPassword = Object.values(passwordChecks).every(Boolean);

  const currentWorkspace =
    workspaces.find((workspace) => workspace.id === selectedWorkspaceId) || null;

  const currentProject =
    projects.find((project) => project.id === selectedProjectId) || null;

  const openTasks = tasks.filter((task) => task.status !== "DONE").length;
  const completedTasks = tasks.filter((task) => task.status === "DONE").length;

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    if (!currentUser?.userId) {
      setWorkspaces([]);
      setProjects([]);
      setTasks([]);
      setSelectedWorkspaceId("");
      setSelectedProjectId("");
      return;
    }

    async function loadWorkspaces() {
      try {
        setIsLoadingWorkspaces(true);
        setDashboardError("");

        const data = await getWorkspacesByUserId(currentUser.userId);
        setWorkspaces(data);

        if (data.length > 0) {
          setSelectedWorkspaceId((prev) =>
            data.some((workspace) => workspace.id === prev) ? prev : data[0].id
          );
        } else {
          setSelectedWorkspaceId("");
          setSelectedProjectId("");
        }
      } catch (error) {
        setDashboardError(error.message);
        showToast(error.message, "error");
      } finally {
        setIsLoadingWorkspaces(false);
      }
    }

    loadWorkspaces();
  }, [currentUser]);

  useEffect(() => {
    if (!selectedWorkspaceId) {
      setProjects([]);
      setTasks([]);
      setSelectedProjectId("");
      return;
    }

    async function loadProjects() {
      try {
        setIsLoadingProjects(true);
        setDashboardError("");

        const data = await getProjectsByWorkspaceId(selectedWorkspaceId);
        setProjects(data);

        if (data.length > 0) {
          setSelectedProjectId((prev) =>
            data.some((project) => project.id === prev) ? prev : data[0].id
          );
        } else {
          setSelectedProjectId("");
          setTasks([]);
        }
      } catch (error) {
        setDashboardError(error.message);
        showToast(error.message, "error");
      } finally {
        setIsLoadingProjects(false);
      }
    }

    loadProjects();
  }, [selectedWorkspaceId]);

  useEffect(() => {
    if (!selectedProjectId) {
      setTasks([]);
      return;
    }

    async function loadTasks() {
      try {
        setIsLoadingTasks(true);
        setDashboardError("");

        const data = await getTasksByProjectId(selectedProjectId);
        setTasks(data);
      } catch (error) {
        setDashboardError(error.message);
        showToast(error.message, "error");
      } finally {
        setIsLoadingTasks(false);
      }
    }

    loadTasks();
  }, [selectedProjectId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setAuthError("");
    setAuthSuccess("");
  };

  const saveUserSession = (user) => {
    localStorage.setItem("sprinthub_user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (authMode === "register" && !isStrongPassword) {
      setAuthError("Please complete all password requirements.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (authMode === "register") {
        await registerUser({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        });

        setAuthMode("login");
        setAuthSuccess("Account created successfully. Please login now.");
        showToast("Account created successfully. Please login now.");

        setForm((prev) => ({
          fullName: "",
          email: prev.email,
          password: "",
        }));

        return;
      }

      const user = await loginUser({
        email: form.email,
        password: form.password,
      });

      saveUserSession(user);
      showToast("Logged in successfully");
    } catch (error) {
      setAuthError(error.message);
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    setAuthError("");
    setAuthSuccess("");
  };

  const logout = () => {
    localStorage.removeItem("sprinthub_user");
    setCurrentUser(null);
    setWorkspaces([]);
    setProjects([]);
    setTasks([]);
    setSelectedWorkspaceId("");
    setSelectedProjectId("");
    setAuthMode("login");
    setForm({
      fullName: "",
      email: "",
      password: "",
    });
  };

  const handleWorkspaceFormChange = (event) => {
    const { name, value } = event.target;

    setWorkspaceForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setDashboardError("");
  };

  const handleCreateWorkspace = async (event) => {
    event.preventDefault();

    if (!workspaceForm.name.trim()) {
      setDashboardError("Workspace name is required");
      showToast("Workspace name is required", "error");
      return;
    }

    try {
      setIsCreatingWorkspace(true);
      setDashboardError("");

      const newWorkspace = await createWorkspace({
        name: workspaceForm.name,
        description: workspaceForm.description,
        ownerId: currentUser.userId,
      });

      setWorkspaces((prev) => [newWorkspace, ...prev]);
      setSelectedWorkspaceId(newWorkspace.id);
      setProjects([]);
      setTasks([]);
      setSelectedProjectId("");

      setWorkspaceForm({
        name: "",
        description: "",
      });

      setIsWorkspaceModalOpen(false);
      showToast("Workspace created successfully");
    } catch (error) {
      setDashboardError(error.message);
      showToast(error.message, "error");
    } finally {
      setIsCreatingWorkspace(false);
    }
  };

  const openEditWorkspaceModal = (workspace) => {
    setEditingWorkspace(workspace);
    setEditWorkspaceForm({
      name: workspace.name,
      description: workspace.description || "",
    });
    setDashboardError("");
  };

  const handleEditWorkspaceFormChange = (event) => {
    const { name, value } = event.target;

    setEditWorkspaceForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setDashboardError("");
  };

  const handleUpdateWorkspace = async (event) => {
    event.preventDefault();

    if (!editingWorkspace?.id) {
      return;
    }

    if (!editWorkspaceForm.name.trim()) {
      setDashboardError("Workspace name is required");
      showToast("Workspace name is required", "error");
      return;
    }

    try {
      setIsUpdatingWorkspace(true);
      setDashboardError("");

      const updatedWorkspace = await updateWorkspace(editingWorkspace.id, {
        name: editWorkspaceForm.name,
        description: editWorkspaceForm.description,
      });

      setWorkspaces((prev) =>
        prev.map((workspace) =>
          workspace.id === updatedWorkspace.id ? updatedWorkspace : workspace
        )
      );

      setEditingWorkspace(null);
      showToast("Workspace updated successfully");
    } catch (error) {
      setDashboardError(error.message);
      showToast(error.message, "error");
    } finally {
      setIsUpdatingWorkspace(false);
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workspace?"
    );

    if (!confirmed) return;

    try {
      setDashboardError("");

      await deleteWorkspace(workspaceId);

      setWorkspaces((prev) => {
        const updatedWorkspaces = prev.filter(
          (workspace) => workspace.id !== workspaceId
        );

        if (selectedWorkspaceId === workspaceId) {
          const nextWorkspaceId = updatedWorkspaces[0]?.id || "";
          setSelectedWorkspaceId(nextWorkspaceId);
          setProjects([]);
          setTasks([]);
          setSelectedProjectId("");
        }

        return updatedWorkspaces;
      });

      showToast("Workspace deleted successfully");
    } catch (error) {
      setDashboardError(error.message);
      showToast(error.message, "error");
    }
  };

  const handleProjectFormChange = (event) => {
    const { name, value } = event.target;

    setProjectForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setDashboardError("");
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();

    if (!currentWorkspace?.id) {
      setDashboardError("Create a workspace first before adding projects.");
      showToast("Create a workspace first before adding projects.", "error");
      return;
    }

    if (!projectForm.name.trim()) {
      setDashboardError("Project name is required");
      showToast("Project name is required", "error");
      return;
    }

    try {
      setIsCreatingProject(true);
      setDashboardError("");

      const newProject = await createProject(currentWorkspace.id, {
        name: projectForm.name,
        description: projectForm.description,
      });

      setProjects((prev) => [newProject, ...prev]);
      setSelectedProjectId(newProject.id);
      setTasks([]);

      setProjectForm({
        name: "",
        description: "",
      });

      setIsProjectModalOpen(false);
      showToast("Project created successfully");
    } catch (error) {
      setDashboardError(error.message);
      showToast(error.message, "error");
    } finally {
      setIsCreatingProject(false);
    }
  };

  const openEditProjectModal = (project) => {
    setEditingProject(project);
    setEditProjectForm({
      name: project.name,
      description: project.description || "",
    });
    setDashboardError("");
  };

  const handleEditProjectFormChange = (event) => {
    const { name, value } = event.target;

    setEditProjectForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setDashboardError("");
  };

  const handleUpdateProject = async (event) => {
    event.preventDefault();

    if (!editingProject?.id) {
      return;
    }

    if (!editProjectForm.name.trim()) {
      setDashboardError("Project name is required");
      showToast("Project name is required", "error");
      return;
    }

    try {
      setIsUpdatingProject(true);
      setDashboardError("");

      const updatedProject = await updateProject(editingProject.id, {
        name: editProjectForm.name,
        description: editProjectForm.description,
      });

      setProjects((prev) =>
        prev.map((project) =>
          project.id === updatedProject.id ? updatedProject : project
        )
      );

      setEditingProject(null);
      showToast("Project updated successfully");
    } catch (error) {
      setDashboardError(error.message);
      showToast(error.message, "error");
    } finally {
      setIsUpdatingProject(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      setDashboardError("");

      await deleteProject(projectId);

      setProjects((prev) => {
        const updatedProjects = prev.filter((project) => project.id !== projectId);

        if (selectedProjectId === projectId) {
          const nextProjectId = updatedProjects[0]?.id || "";
          setSelectedProjectId(nextProjectId);

          if (!nextProjectId) {
            setTasks([]);
          }
        }

        return updatedProjects;
      });

      showToast("Project deleted successfully");
    } catch (error) {
      setDashboardError(error.message);
      showToast(error.message, "error");
    }
  };

  const handleTaskFormChange = (event) => {
    const { name, value } = event.target;

    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setDashboardError("");
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();

    if (!currentProject?.id) {
      setDashboardError("Create a project first before adding tasks.");
      showToast("Create a project first before adding tasks.", "error");
      return;
    }

    if (!taskForm.title.trim()) {
      setDashboardError("Task title is required");
      showToast("Task title is required", "error");
      return;
    }

    try {
      setIsCreatingTask(true);
      setDashboardError("");

      const newTask = await createTask(currentProject.id, {
        title: taskForm.title,
        description: taskForm.description,
        priority: taskForm.priority,
      });

      setTasks((prev) => [newTask, ...prev]);

      setTaskForm({
        title: "",
        description: "",
        priority: "MEDIUM",
      });

      setIsTaskModalOpen(false);
      showToast("Task created successfully");
    } catch (error) {
      setDashboardError(error.message);
      showToast(error.message, "error");
    } finally {
      setIsCreatingTask(false);
    }
  };

  const handleTaskStatusChange = async (taskId, status) => {
    try {
      setDashboardError("");

      const updatedTask = await updateTaskStatus(taskId, status);

      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );

      showToast("Task status updated");
    } catch (error) {
      setDashboardError(error.message);
      showToast(error.message, "error");
    }
  };

  const openEditTaskModal = (task) => {
    setEditingTask(task);
    setEditTaskForm({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
    });
    setDashboardError("");
  };

  const handleEditTaskFormChange = (event) => {
    const { name, value } = event.target;

    setEditTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setDashboardError("");
  };

  const handleUpdateTask = async (event) => {
    event.preventDefault();

    if (!editingTask?.id) {
      return;
    }

    if (!editTaskForm.title.trim()) {
      setDashboardError("Task title is required");
      showToast("Task title is required", "error");
      return;
    }

    try {
      setIsUpdatingTask(true);
      setDashboardError("");

      const updatedTask = await updateTask(editingTask.id, {
        title: editTaskForm.title,
        description: editTaskForm.description,
        priority: editTaskForm.priority,
      });

      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );

      setEditingTask(null);
      showToast("Task updated successfully");
    } catch (error) {
      setDashboardError(error.message);
      showToast(error.message, "error");
    } finally {
      setIsUpdatingTask(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");

    if (!confirmed) return;

    try {
      setDashboardError("");

      await deleteTask(taskId);

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      showToast("Task deleted successfully");
    } catch (error) {
      setDashboardError(error.message);
      showToast(error.message, "error");
    }
  };


  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!currentUser) {
    return (
      <AuthPage
        authMode={authMode}
        form={form}
        passwordChecks={passwordChecks}
        isSubmitting={isSubmitting}
        authError={authError}
        authSuccess={authSuccess}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onSwitchAuthMode={switchAuthMode}
      />
    );
  }

  return (
    <div className="app">
      <Sidebar
        currentUser={currentUser}
        currentWorkspace={currentWorkspace}
        onLogout={logout}
        onScrollToTop={scrollToTop}
        onScrollToSection={scrollToSection}
      />

      <main className="main">
        <div className="page-container">
          <header className="topbar">
            <div className="topbar-content">
              <p className="eyebrow">Project management platform</p>
              <h2>Build, track, and ship work faster.</h2>
              <p className="subtitle">
                Welcome back, {currentUser.fullName}. Your SprintHub dashboard is ready.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setIsWorkspaceModalOpen(true)}
            >
              New Workspace
            </button>
          </header>

          <section className="selectors-panel">
            <div className="selector-group">
              <label>Workspace</label>
              <select
                value={selectedWorkspaceId}
                onChange={(event) => setSelectedWorkspaceId(event.target.value)}
                disabled={workspaces.length === 0}
              >
                {workspaces.length === 0 && <option>No workspace yet</option>}
                {workspaces.map((workspace) => (
                  <option key={workspace.id} value={workspace.id}>
                    {workspace.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="selector-group">
              <label>Project</label>
              <select
                value={selectedProjectId}
                onChange={(event) => setSelectedProjectId(event.target.value)}
                disabled={projects.length === 0}
              >
                {projects.length === 0 && <option>No project yet</option>}
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <p>Workspaces</p>
              <strong>{isLoadingWorkspaces ? "..." : workspaces.length}</strong>
              <span>From your account</span>
            </div>

            <div className="stat-card">
              <p>Projects</p>
              <strong>{isLoadingProjects ? "..." : projects.length}</strong>
              <span>From selected workspace</span>
            </div>

            <div className="stat-card">
              <p>Open Tasks</p>
              <strong>{isLoadingTasks ? "..." : openTasks}</strong>
              <span>Real task data</span>
            </div>

            <div className="stat-card">
              <p>Completed</p>
              <strong>{isLoadingTasks ? "..." : completedTasks}</strong>
              <span>Done tasks</span>
            </div>
          </section>

          <section className="content-grid">
            <div className="panel" id="workspaces-section">
              <div className="panel-header">
                <div>
                  <h3>Your Workspaces</h3>
                  <p>Manage all your team workspaces in one place.</p>
                </div>
                <button
                  className="text-button"
                  onClick={() => setIsWorkspaceModalOpen(true)}
                >
                  New workspace
                </button>
              </div>

              <div className="project-list">
                {dashboardError && <div className="dashboard-error">{dashboardError}</div>}

                {isLoadingWorkspaces && (
                  <div className="project-item">
                    <div>
                      <h4>Loading workspaces...</h4>
                      <p>Please wait while SprintHub loads your data.</p>
                    </div>
                    <span className="badge warning">Loading</span>
                  </div>
                )}

                {!isLoadingWorkspaces && workspaces.length === 0 && (
                  <div className="project-item">
                    <div>
                      <h4>No workspaces yet</h4>
                      <p>Create your first workspace directly from the dashboard.</p>
                    </div>
                    <span className="badge secondary">Empty</span>
                  </div>
                )}

                {!isLoadingWorkspaces &&
                  workspaces.map((workspace) => (
                    <div
                      className={`project-item clickable ${
                        workspace.id === selectedWorkspaceId ? "selected-item" : ""
                      }`}
                      key={workspace.id}
                      onClick={() => setSelectedWorkspaceId(workspace.id)}
                    >
                      <div>
                        <h4>{workspace.name}</h4>
                        <p>{workspace.description || "No description provided"}</p>
                      </div>

                      <div className="item-actions">
                        <span className="badge">Workspace</span>

                        <button
                          className="mini-edit-button"
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openEditWorkspaceModal(workspace);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="mini-danger-button"
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteWorkspace(workspace.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="panel" id="projects-section">
              <div className="panel-header">
                <div>
                  <h3>Projects in current workspace</h3>
                  <p>
                    {currentWorkspace
                      ? `Projects inside ${currentWorkspace.name}.`
                      : "Select or create a workspace to view projects."}
                  </p>
                </div>
                <button
                  className="text-button"
                  onClick={() => setIsProjectModalOpen(true)}
                >
                  New project
                </button>
              </div>

              <div className="project-list">
                {isLoadingProjects && (
                  <div className="project-item">
                    <div>
                      <h4>Loading projects...</h4>
                      <p>Please wait while SprintHub loads workspace projects.</p>
                    </div>
                    <span className="badge warning">Loading</span>
                  </div>
                )}

                {!isLoadingProjects && currentWorkspace && projects.length === 0 && (
                  <div className="project-item">
                    <div>
                      <h4>No projects yet</h4>
                      <p>Create your first project directly from this dashboard.</p>
                    </div>
                    <span className="badge secondary">Empty</span>
                  </div>
                )}

                {!isLoadingProjects &&
                  projects.map((project) => (
                    <div
                      className={`project-item clickable ${
                        project.id === selectedProjectId ? "selected-item" : ""
                      }`}
                      key={project.id}
                      onClick={() => setSelectedProjectId(project.id)}
                    >
                      <div>
                        <h4>{project.name}</h4>
                        <p>{project.description || "No description provided"}</p>
                      </div>

                      <div className="item-actions">
                        <span className="badge">Project</span>

                        <button
                          className="mini-edit-button"
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openEditProjectModal(project);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="mini-danger-button"
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          <KanbanBoard
            currentProject={currentProject}
            tasks={tasks}
            isLoadingTasks={isLoadingTasks}
            onNewTask={() => setIsTaskModalOpen(true)}
            onEditTask={openEditTaskModal}
            onDeleteTask={handleDeleteTask}
            onTaskStatusChange={handleTaskStatusChange}
          />

          <section className="wide-panel settings-panel" id="settings-section">
            <div>
              <p className="eyebrow dark">Settings</p>
              <h3>Account and workspace overview</h3>
              <p>
                Manage your current session, selected workspace, and active project from one place.
              </p>
            </div>

            <div className="settings-grid">
              <div className="settings-card">
                <span>Account</span>
                <strong>{currentUser.fullName}</strong>
                <p>{currentUser.email}</p>
              </div>

              <div className="settings-card">
                <span>Current workspace</span>
                <strong>{currentWorkspace ? currentWorkspace.name : "No workspace selected"}</strong>
                <p>{currentWorkspace?.description || "Create or select a workspace to continue."}</p>
              </div>

              <div className="settings-card">
                <span>Current project</span>
                <strong>{currentProject ? currentProject.name : "No project selected"}</strong>
                <p>{currentProject?.description || "Create or select a project to manage tasks."}</p>
              </div>

              <div className="settings-card danger-zone">
                <span>Session</span>
                <strong>Signed in</strong>
                <p>You can safely log out and return later.</p>
                <button className="logout-inline-button" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {isWorkspaceModalOpen && (
        <WorkspaceModal
          title="Create workspace"
          eyebrow="New workspace"
          name={workspaceForm.name}
          description={workspaceForm.description}
          isSubmitting={isCreatingWorkspace}
          submitLabel="Create workspace"
          loadingLabel="Creating..."
          onChange={handleWorkspaceFormChange}
          onClose={() => setIsWorkspaceModalOpen(false)}
          onSubmit={handleCreateWorkspace}
        />
      )}

      {editingWorkspace && (
        <WorkspaceModal
          title="Update workspace"
          eyebrow="Edit workspace"
          name={editWorkspaceForm.name}
          description={editWorkspaceForm.description}
          isSubmitting={isUpdatingWorkspace}
          submitLabel="Save changes"
          loadingLabel="Saving..."
          onChange={handleEditWorkspaceFormChange}
          onClose={() => setEditingWorkspace(null)}
          onSubmit={handleUpdateWorkspace}
        />
      )}

      {isProjectModalOpen && (
        <ProjectModal
          title="Create project"
          eyebrow="New project"
          name={projectForm.name}
          description={projectForm.description}
          isSubmitting={isCreatingProject}
          submitLabel="Create project"
          loadingLabel="Creating..."
          onChange={handleProjectFormChange}
          onClose={() => setIsProjectModalOpen(false)}
          onSubmit={handleCreateProject}
        />
      )}

      {editingProject && (
        <ProjectModal
          title="Update project"
          eyebrow="Edit project"
          name={editProjectForm.name}
          description={editProjectForm.description}
          isSubmitting={isUpdatingProject}
          submitLabel="Save changes"
          loadingLabel="Saving..."
          onChange={handleEditProjectFormChange}
          onClose={() => setEditingProject(null)}
          onSubmit={handleUpdateProject}
        />
      )}

      {isTaskModalOpen && (
        <TaskModal
          title="Create task"
          eyebrow="New task"
          taskForm={taskForm}
          isSubmitting={isCreatingTask}
          submitLabel="Create task"
          loadingLabel="Creating..."
          onChange={handleTaskFormChange}
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={handleCreateTask}
        />
      )}

      {editingTask && (
        <TaskModal
          title="Update task"
          eyebrow="Edit task"
          taskForm={editTaskForm}
          isSubmitting={isUpdatingTask}
          submitLabel="Save changes"
          loadingLabel="Saving..."
          onChange={handleEditTaskFormChange}
          onClose={() => setEditingTask(null)}
          onSubmit={handleUpdateTask}
        />
      )}

      {toast && (
        <div className={`toast ${toast.type}`}>
          <span>{toast.type === "success" ? "✓" : "!"}</span>
          <p>{toast.message}</p>
        </div>
      )}

      <button className="scroll-top-button" onClick={scrollToTop} aria-label="Scroll to top">
        ↑
      </button>
    </div>
  );
}


export default App;