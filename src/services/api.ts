import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../Contexts/AuthContext'
import { AuthTokenError } from './errors/AuthTokenError'

let isRefreshing = false
let failedRequestsQueue = []

export const setupAPIClient = (ctx = undefined) => {
  let cookies = parseCookies(ctx)
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response.data === 'token.expired') {
        cookies = parseCookies()
        const { 'nextaut.refreshToken': refreshToken } = cookies
        const originalConfig: AxiosRequestConfig = error.config
        if(!isRefreshing){
          isRefreshing = true
          api.post('/refresh', {
            refreshToken
          }).then(response => {
            const { token } = response.data
            setCookie(ctx, 'nextauth.token', token, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            })
            setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            })
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            failedRequestsQueue.forEach(request => request.resolve(token))
            failedRequestsQueue = []
          }).catch(err => {
            failedRequestsQueue.forEach(request => request.reject(err))
            if (typeof window !== 'undefined') {
              signOut()
            }
          })
            .finally(() => {
            isRefreshing = false
          })
        }
        return new Promise((resolve, reject)=>{
          failedRequestsQueue.push({
            resolve: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`
              resolve(api(originalConfig))
            },
            reject: (error: AxiosError) => {
              reject(error)
            }
          })
        })
      } else {
        if (typeof window !== 'undefined') {
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
    }
    return Promise.reject(error)
  })
  return api
}