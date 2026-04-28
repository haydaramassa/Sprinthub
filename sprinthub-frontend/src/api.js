const API_BASE_URL = "http://localhost:8080/api";

function getAuthToken() {
  const savedUser = localStorage.getItem("sprinthub_user");

  if (!savedUser) {
    return null;
  }

  try {
    const user = JSON.parse(savedUser);
    return user.token || null;
  } catch {
    return null;
  }
}

async function request(path, options = {}) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.message ||
      data?.errors?.password ||
      data?.errors?.email ||
      data?.errors?.fullName ||
      data?.errors?.name ||
      data?.errors?.title ||
      data?.errors?.status ||
      "Something went wrong";

    throw new Error(message);
  }

  return data;
}

export function registerUser(payload) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getWorkspacesByUserId(userId) {
  return request(`/workspaces/user/${userId}`);
}

export function createWorkspace(payload) {
  return request("/workspaces", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateWorkspace(workspaceId, payload) {
  return request(`/workspaces/${workspaceId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteWorkspace(workspaceId) {
  return request(`/workspaces/${workspaceId}`, {
    method: "DELETE",
  });
}

export function getProjectsByWorkspaceId(workspaceId) {
  return request(`/workspaces/${workspaceId}/projects`);
}

export function createProject(workspaceId, payload) {
  return request(`/workspaces/${workspaceId}/projects`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateProject(projectId, payload) {
  return request(`/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteProject(projectId) {
  return request(`/projects/${projectId}`, {
    method: "DELETE",
  });
}

export function getTasksByProjectId(projectId) {
  return request(`/projects/${projectId}/tasks`);
}

export function createTask(projectId, payload) {
  return request(`/projects/${projectId}/tasks`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateTask(taskId, payload) {
  return request(`/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteTask(taskId) {
  return request(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}

export function updateTaskStatus(taskId, status) {
  return request(`/tasks/${taskId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}