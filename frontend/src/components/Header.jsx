function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brandMark">R</div>

        <div>
          <strong>ReportReady</strong>
          <span>AI-Assisted Incident Documentation</span>
        </div>
      </div>

      <div className="headerRight">
        <span className="draftBadge">
          DRAFT SYSTEM
        </span>

        <span className="incidentNumber">
          Incident #0042
        </span>
      </div>
    </header>
  );
}

export default Header;