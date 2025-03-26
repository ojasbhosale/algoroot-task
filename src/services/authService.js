// Mock user database in localStorage
const initializeUsers = () => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            id: 1,
            name: "Test User",
            email: "test@example.com",
            password: "password123",
          },
        ]),
      )
    }
  }
  
  // Login user
  export const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        initializeUsers()
        const users = JSON.parse(localStorage.getItem("users"))
        const user = users.find((u) => u.email === email && u.password === password)
  
        if (user) {
          // Don't send password to the front end
          const { password: _, ...userWithoutPassword } = user
          resolve(userWithoutPassword)
        } else {
          reject({ message: "Invalid email or password" })
        }
      }, 500)
    })
  }
  
  // Register user
  export const registerUser = (name, email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        initializeUsers()
        const users = JSON.parse(localStorage.getItem("users"))
  
        // Check if user already exists
        if (users.some((u) => u.email === email)) {
          reject({ message: "User with this email already exists" })
          return
        }
  
        // Create new user
        const newUser = {
          id: users.length + 1,
          name,
          email,
          password,
        }
  
        // Add to "database"
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
  
        // Don't send password to the front end
        const { password: _, ...userWithoutPassword } = newUser
        resolve(userWithoutPassword)
      }, 500)
    })
  }
  
  // Logout user
  export const logoutUser = () => {
    // In a real app, you might want to invalidate tokens on the server
    return true
  }
  
  