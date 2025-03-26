"use client"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "../context/hooks/useAuth"
import "../styles/Navbar.css"
import logo1 from "../assets/logo1.png" // Make sure to add your logo image in the assets folder

const Navbar = () => {
  const { currentUser, logout, deleteAccount } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = "/login"
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      deleteAccount()
      window.location.href = "/login"
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img 
            src={logo1} 
            alt="AlgoRoot Logo" 
            className="navbar-logo-icon" 
          />
          <h1>
            <span className="logo-algo">Algo</span>
            <span className="logo-root">Root</span>
          </h1>
        </div>

        {/* Rest of the component remains the same */}
        <div className="navbar-user" ref={dropdownRef}>
          <button className="user-button" onClick={() => setDropdownOpen(!dropdownOpen)} aria-label="User menu">
            <div className="user-avatar">{currentUser?.name?.charAt(0) || "U"}</div>
          </button>

          {dropdownOpen && (
            <div className="user-dropdown">
              <div className="user-info">
                <p className="user-name">{currentUser?.name}</p>
                <p className="user-email">{currentUser?.email}</p>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ marginRight: "8px" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
                Logout
              </button>
              <button className="dropdown-item delete-account" onClick={handleDeleteAccount}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ marginRight: "8px" }}
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar