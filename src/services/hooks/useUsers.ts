import { api } from "../apiClient"
import { useQuery } from "react-query"

export type Users = {
  name: string
  id: number
  email: string
  createdAt?: string,
  permissions?: string[],
  roles?: string[]
}

type GetUsersResponse = {
  totalCount: number
  users: Users[]
}

 export const getUsers = async (page: number): Promise<GetUsersResponse> => {
  const { data, headers } = await api.get('users', {
    params: {
      page
    }
  })
  let totalCount = Number(headers['x-total-count'])
  if(!totalCount)
    totalCount = 10
  const users = data.map((user: Users) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    }
  })
  return {
    users,
    totalCount
  }
}

export const useUsers = (page: number) => {
  return useQuery (['users', page], () => getUsers(page),{
    staleTime: 1000 * 5
  })

}
