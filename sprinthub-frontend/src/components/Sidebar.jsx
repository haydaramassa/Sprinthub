function Sidebar({
    currentUser,
    currentWorkspace,
    onLogout,
    onScrollToTop,
    onScrollToSection,
  }) {
    return (
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">S</div>
          <div>
            <h1>SprintHub</h1>
            <p>Team workspace</p>
          </div>
        </div>
  
        <nav className="nav">
          <a className="active" onClick={onScrollToTop}>
            Dashboard
          </a>
          <a onClick={() => onScrollToSection("workspaces-section")}>
            Workspaces
          </a>
          <a onClick={() => onScrollToSection("projects-section")}>
            Projects
          </a>
          <a onClick={() => onScrollToSection("tasks-section")}>
            Tasks
          </a>
          <a onClick={() => onScrollToSection("settings-section")}>
            Settings
          </a>
        </nav>
  
        <div className="sidebar-card">
          <p>Signed in as</p>
          <strong>{currentUser.fullName}</strong>
          <span>{currentUser.email}</span>
  
          <div className="sidebar-divider" />
  
          <p>Current workspace</p>
          <strong>{currentWorkspace ? currentWorkspace.name : "No workspace yet"}</strong>
  
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>
    );
  }
  
  export default Sidebar;