import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../api/index'


export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount, fetch current user if token exists
  useEffect(() => {

    const fetchUser = async () => {

      const token = localStorage.getItem('rc_token')

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const res = await authAPI.me()
        setUser(res.data)
      } catch (error) {
        localStorage.removeItem('rc_token')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

  }, [])

  const login = async (credentials) => {
    const res = await authAPI.login(credentials)
    localStorage.setItem('rc_token', res.data.token)
    const me = await authAPI.me()
    setUser(me.data)
    return me.data
  }

  const register = async (data) => {
    const res = await authAPI.register(data)
    localStorage.setItem('rc_token', res.data.token)
    const me = await authAPI.me()
    setUser(me.data)
    return me.data
  }

  const logout = () => {
    localStorage.removeItem('rc_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 
// 👉 =dispatchfn t send action = Action = Instruction / message that tells React what to do
// {
//   type: "LOGIN",
//   payload: "abc123"
// }
// } 
// 👉 Payload = Extra data jo action ke saath bheja jata hai
// localStorage.getItem("token") = refresh-safe login

// 🔐 LOGIN FLOW

// dispatch LOGIN
// state.token update
// useEffect run
// token saved in localStorage

// 🚪 LOGOUT FLOW

// dispatch LOGOUT
// state.token = null
// useEffect run
// token removed from localStorage



// React says:

// Same object → No update
// New object → Update


// Situation	Spread Needed?
// Single property state	❌ No
// Multiple properties	✅ Yes
// Nested objects	✅ Yes (careful)
// Full state reset	❌ No


// state → current state

// dispatch → function to send actions

// reducer → function that updates state

// initialState → starting value

// You call dispatch({ type: "INCREMENT" })

// React calls reducer(state, action)

// Reducer returns new state

// Component re-renders


// useReducer controls how state changes

// useContext makes that state available everywhere



// AuthProvider
//    ├── useReducer (state logic)
//    ├── Provider (shares state + dispatch)
//    └── Children consume via useContext
