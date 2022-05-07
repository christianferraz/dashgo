import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { parseCookies, setCookie } from 'nookies'

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue = []

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
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
          setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          })
          setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
          })
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        })
      }
      return new Promise((resolve, reject)=>{
        failedRequestsQueue.push({
          resolve: (token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`
            resolve(api(originalConfig))
          },
          reject
        })
      })
    } else {
      //deslogar usuário
    }
  }
})
