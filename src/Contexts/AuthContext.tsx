import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/apiClient'

export type SignInCredentials = {
  username: string
  password: string
}

type Users = {
  username: string
  permissions: string[]
  roles: string[]
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
  user?: Users
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)



export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<Users>()
  const isAuthenticated = !!user

  // useEffect(()=>{
  //   authChannel = new BroadcastChannel('auth')
  //   authChannel.onmessage = (message) => {
  //     console.log('authchannel.onmessage')
  //     switch(message.data) {
  //       case 'signOut':
  //         signOut()
  //         break

  //       default:
  //         break
  //     }
  //   }
  // },[])

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    if (token) {
      api.get('/me').then(response => {
        const { username, permissions, roles } = response.data
        setUser({ username, permissions, roles })
      })
      .catch(error => {
        console.log('erro 47 ', error)
        signOut()
      })
    }
  },[])

  const signOut = () => {
    destroyCookie(undefined, 'nextauth.token')
    destroyCookie(undefined, 'nextauth.refreshToken')
    setUser(null)
    //authChannel.postMessage('signOut')
    console.log('signOut button')
    Router.push('/')
  }
  const signIn = async ({ username, password }: SignInCredentials) => {
    try {
      const response = await api.post('sessions', {
        username,
        password,
      })
      const { token, refreshToken, permissions, roles } = response.data
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
      setUser({ username, permissions, roles })
      api.defaults.headers['Authorization'] = `Bearer ${token}`
      Router.push('/dashboard')
      // authChannel.postMessage('signIn')
    } catch (err) {
      // Entra aqui em caso de senha inválida
      console.log(err)
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}