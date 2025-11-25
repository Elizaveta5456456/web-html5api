import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'shop-auth'

const AuthContext = createContext(null)

const readStoredUser = () => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.error('Failed to parse stored user', error)
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (user) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.error('Failed to persist user', error)
    }
  }, [user])

  const login = (credentials) => {
    const sanitizedName = credentials?.username?.trim()
    if (!sanitizedName) {
      throw new Error('Имя пользователя обязательно')
    }
    setUser({ username: sanitizedName })
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth должен использоваться внутри AuthProvider')
  }
  return context
}

