const TASK_COLUMNS = [
    { key: "TODO", label: "TODO" },
    { key: "IN_PROGRESS", label: "IN PROGRESS" },
    { key: "IN_REVIEW", label: "IN REVIEW" },
    { key: "DONE", label: "DONE" },
  ];
  
  function KanbanBoard({
    currentProject,
    tasks,
    isLoadingTasks,
    onNewTask,
    onEditTask,
    onDeleteTask,
    onTaskStatusChange,
  }) {
    const getTasksByStatus = (status) => {
      return tasks.filter((task) => task.status === status);
    };
  
    return (
      <section className="panel kanban-panel" id="tasks-section">
        <div className="panel-header">
          <div>
            <h3>Kanban Board</h3>
            <p>
              {currentProject
                ? `Track the workflow for ${currentProject.name}.`
                : "Create a project and tasks to start tracking work."}
            </p>
          </div>
  
          <button className="text-button" onClick={onNewTask}>
            New task
          </button>
        </div>
  
        {!currentProject && (
          <div className="project-item">
            <div>
              <h4>No project selected</h4>
              <p>Create or select a project first, then add tasks.</p>
            </div>
            <span className="badge secondary">Empty</span>
          </div>
        )}
  
        {currentProject && !isLoadingTasks && tasks.length === 0 && (
          <div className="project-item">
            <div>
              <h4>No tasks yet</h4>
              <p>Create your first task directly from this board.</p>
            </div>
            <span className="badge secondary">Empty</span>
          </div>
        )}
  
        {currentProject && tasks.length > 0 && (
          <div className="kanban real-kanban">
            {TASK_COLUMNS.map((column) => (
              <div className="kanban-column" key={column.key}>
                <h4>{column.label}</h4>
  
                {getTasksByStatus(column.key).length === 0 && (
                  <div className="empty-column">No tasks</div>
                )}
  
                {getTasksByStatus(column.key).map((task) => (
                  <div className="task-card" key={task.id}>
                    <strong>{task.title}</strong>
                    <p>{task.priority} priority</p>
  
                    {task.description && (
                      <span className="task-description">{task.description}</span>
                    )}
  
                    <select
                      className="status-select"
                      value={task.status}
                      onChange={(event) =>
                        onTaskStatusChange(task.id, event.target.value)
                      }
                    >
                      <option value="TODO">TODO</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="IN_REVIEW">IN REVIEW</option>
                      <option value="DONE">DONE</option>
                    </select>
  
                    <button
                      className="edit-button"
                      onClick={() => onEditTask(task)}
                      type="button"
                    >
                      Edit task
                    </button>
  
                    <button
                      className="danger-button"
                      onClick={() => onDeleteTask(task.id)}
                      type="button"
                    >
                      Delete task
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
  
  export default KanbanBoard;