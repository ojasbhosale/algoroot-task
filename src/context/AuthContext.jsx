"use client"

import { useState, useEffect } from "react"
import { loginUser, registerUser, logoutUser } from "../services/authService"
import { AuthContext } from "./contexts/AuthContext"

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email, password) => {
    try {
      setError("")
      const user = await loginUser(email, password)
      setCurrentUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Signup function
  const signup = async (name, email, password) => {
    try {
      setError("")
      const user = await registerUser(name, email, password)
      setCurrentUser(user)
      localStorage.setItem("user", JSON.stringify(user))
      return user
    } catch (error) {
      setError(error.message)
      throw error
    }
  }

  // Logout function
  const logout = () => {
    logoutUser()
    setCurrentUser(null)
    localStorage.removeItem("user")
  }

  // Delete account function
  const deleteAccount = () => {
    // In a real app, you would call an API to delete the user
    setCurrentUser(null)
    localStorage.removeItem("user")
    // Also remove any other user-related data from localStorage
    localStorage.removeItem("users")
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    deleteAccount,
    error,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

