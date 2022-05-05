import { useRouter } from 'next/router'
import { createContext, ReactNode, useState } from 'react'
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
  const signIn = async ({ username, password }: SignInCredentials) => {
    try {
      const response = await api.post('sessions', {
        user,
        password,
      })
      const { permissions, roles } = response.data
      setUser({username, permissions, roles})
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