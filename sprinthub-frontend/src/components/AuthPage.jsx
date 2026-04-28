function AuthPage({
    authMode,
    form,
    passwordChecks,
    isSubmitting,
    authError,
    authSuccess,
    onChange,
    onSubmit,
    onSwitchAuthMode,
  }) {
    return (
      <main className="auth-page">
        <section className="auth-visual">
          <div className="floating-orb orb-one" />
          <div className="floating-orb orb-two" />
          <div className="floating-orb orb-three" />
  
          <div className="auth-brand">
            <div className="brand-logo large">S</div>
            <div>
              <h1>SprintHub</h1>
              <p>Plan. Track. Ship.</p>
            </div>
          </div>
  
          <div className="hero-copy">
            <p className="eyebrow">SaaS project management</p>
            <h2>Run your workspace like a real product team.</h2>
            <p>
              Manage teams, workspaces, projects, tasks, priorities, and progress
              from one clean modern dashboard.
            </p>
          </div>
  
          <div className="preview-card">
            <div className="preview-header">
              <span />
              <span />
              <span />
            </div>
  
            <div className="mini-kanban">
  <div>
    <strong>TODO</strong>
    <p>Plan release roadmap</p>
  </div>
  <div>
    <strong>IN PROGRESS</strong>
    <p>Build secure APIs</p>
  </div>
  <div>
    <strong>DONE</strong>
    <p>Launch MVP dashboard</p>
  </div>
</div>
          </div>
        </section>
  
        <section className="auth-panel">
          <div className="auth-card">
            <div className="auth-tabs">
              <button
                className={authMode === "login" ? "active" : ""}
                onClick={() => onSwitchAuthMode("login")}
                type="button"
              >
                Login
              </button>
  
              <button
                className={authMode === "register" ? "active" : ""}
                onClick={() => onSwitchAuthMode("register")}
                type="button"
              >
                Register
              </button>
            </div>
  
            <div className="auth-heading">
              <p className="eyebrow dark">
                {authMode === "login" ? "Welcome back" : "Create account"}
              </p>
  
              <h2>
                {authMode === "login"
                  ? "Login to SprintHub"
                  : "Start your SprintHub workspace"}
              </h2>
  
              <p>
                {authMode === "login"
                  ? "Use your email and password to continue to your dashboard."
                  : "Create a secure account to manage your workspaces and projects."}
              </p>
            </div>
  
            <form className="auth-form" onSubmit={onSubmit}>
              {authMode === "register" && (
                <label>
                  Full name
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    placeholder="Haydara Developer"
                    autoComplete="name"
                  />
                </label>
              )}
  
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="haydara@example.com"
                  autoComplete="email"
                />
              </label>
  
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="••••••••"
                  autoComplete={authMode === "login" ? "current-password" : "new-password"}
                />
              </label>
  
              {authMode === "register" && (
                <div className="password-rules">
                  <Rule active={passwordChecks.length} label="At least 8 characters" />
                  <Rule active={passwordChecks.uppercase} label="One uppercase letter" />
                  <Rule active={passwordChecks.lowercase} label="One lowercase letter" />
                  <Rule active={passwordChecks.number} label="One number" />
                  <Rule active={passwordChecks.special} label="One special character" />
                </div>
              )}
  
              {authError && <div className="auth-message error">{authError}</div>}
              {authSuccess && <div className="auth-message success">{authSuccess}</div>}
  
              <button className="submit-button" type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Please wait..."
                  : authMode === "login"
                    ? "Login"
                    : "Create account"}
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }
  
  function Rule({ active, label }) {
    return (
      <div className={`password-rule ${active ? "valid" : ""}`}>
        <span>{active ? "✓" : "•"}</span>
        {label}
      </div>
    );
  }
  
  export default AuthPage;