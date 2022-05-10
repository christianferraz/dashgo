
type User = {
  permissions: string[]
  roles: string[]
}

type ValidateUserPermissionsParms = {
  user: User
  permissions?: string[]
  roles?: string[]
}

export const validateUserPermissions = ({user, permissions, roles}: ValidateUserPermissionsParms) => {
  if(permissions?.length > 0){
    const hasAllPermissions = permissions.some(permission => user.permissions.includes(permission))
    if(!hasAllPermissions) {
      return false
    }else{
      return true
    }
  }
  if(roles?.length > 0){
    const hasAllRoles = roles.some(role => user.roles.includes(role))
    if(!hasAllRoles) {
      return false
    }
  }
  return true
}