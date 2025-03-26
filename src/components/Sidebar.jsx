import "../styles/Sidebar.css"

const Sidebar = ({ activePage }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Dashboard</h3>
      </div>
      <ul className="sidebar-menu">
        <li className={`sidebar-item ${activePage === "details" ? "active" : ""}`}>
          <a href="/details" className="sidebar-link">
            <span className="sidebar-icon">📊</span>
            <span className="sidebar-text">Details</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar

