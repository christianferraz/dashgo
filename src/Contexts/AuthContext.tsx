import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

type SignInCredentials = {
  username: string
  password: string
}

type Users = {
  username: string
  permissions: string[]
  roles: string[]
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAuthenticated: boolean
  user?: Users
}

type AuthProviderProps = {
  children: ReactNode
}


export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<Users>()
  const router = useRouter()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    if (token) {
      api.get('/me').then(response => {
        const { username, permissions, roles } = response.data
        setUser({ username, permissions, roles })
      })
    }
  },[])

  const signIn = async ({ username, password }: SignInCredentials) => {
    try {
      const response = await api.post('sessions', {
        user,
        password,
      })
      const { token, refreshToken, permissions, roles } = response.data
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
      setCookie(undefined, 'nextauth.token', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
      setUser({ username, permissions, roles })
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      router.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}