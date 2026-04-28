function WorkspaceModal({
    title,
    eyebrow,
    name,
    description,
    isSubmitting,
    submitLabel,
    loadingLabel,
    onChange,
    onClose,
    onSubmit,
  }) {
    return (
      <div className="modal-backdrop">
        <div className="modal-card">
          <div className="modal-header">
            <div>
              <p className="eyebrow dark">{eyebrow}</p>
              <h3>{title}</h3>
            </div>
  
            <button className="modal-close" onClick={onClose} type="button">
              ×
            </button>
          </div>
  
          <form className="modal-form" onSubmit={onSubmit}>
            <label>
              Workspace name
              <input
                name="name"
                value={name}
                onChange={onChange}
                placeholder="SprintHub Team"
              />
            </label>
  
            <label>
              Description
              <textarea
                name="description"
                value={description}
                onChange={onChange}
                placeholder="Main workspace for managing projects and tasks"
                rows="4"
              />
            </label>
  
            <div className="modal-actions">
              <button className="secondary-button" type="button" onClick={onClose}>
                Cancel
              </button>
  
              <button className="submit-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? loadingLabel : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  function ProjectModal({
    title,
    eyebrow,
    name,
    description,
    isSubmitting,
    submitLabel,
    loadingLabel,
    onChange,
    onClose,
    onSubmit,
  }) {
    return (
      <div className="modal-backdrop">
        <div className="modal-card">
          <div className="modal-header">
            <div>
              <p className="eyebrow dark">{eyebrow}</p>
              <h3>{title}</h3>
            </div>
  
            <button className="modal-close" onClick={onClose} type="button">
              ×
            </button>
          </div>
  
          <form className="modal-form" onSubmit={onSubmit}>
            <label>
              Project name
              <input
                name="name"
                value={name}
                onChange={onChange}
                placeholder="SprintHub Frontend"
              />
            </label>
  
            <label>
              Description
              <textarea
                name="description"
                value={description}
                onChange={onChange}
                placeholder="React dashboard, authentication screens, and Kanban board"
                rows="4"
              />
            </label>
  
            <div className="modal-actions">
              <button className="secondary-button" type="button" onClick={onClose}>
                Cancel
              </button>
  
              <button className="submit-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? loadingLabel : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  function TaskModal({
    title,
    eyebrow,
    taskForm,
    isSubmitting,
    submitLabel,
    loadingLabel,
    onChange,
    onClose,
    onSubmit,
  }) {
    return (
      <div className="modal-backdrop">
        <div className="modal-card">
          <div className="modal-header">
            <div>
              <p className="eyebrow dark">{eyebrow}</p>
              <h3>{title}</h3>
            </div>
  
            <button className="modal-close" onClick={onClose} type="button">
              ×
            </button>
          </div>
  
          <form className="modal-form" onSubmit={onSubmit}>
            <label>
              Task title
              <input
                name="title"
                value={taskForm.title}
                onChange={onChange}
                placeholder="Build workspace settings page"
              />
            </label>
  
            <label>
              Description
              <textarea
                name="description"
                value={taskForm.description}
                onChange={onChange}
                placeholder="Create UI and connect it with the backend API"
                rows="4"
              />
            </label>
  
            <label>
              Priority
              <select
                name="priority"
                value={taskForm.priority}
                onChange={onChange}
                className="modal-select"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="URGENT">URGENT</option>
              </select>
            </label>
  
            <div className="modal-actions">
              <button className="secondary-button" type="button" onClick={onClose}>
                Cancel
              </button>
  
              <button className="submit-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? loadingLabel : submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export { WorkspaceModal, ProjectModal, TaskModal };