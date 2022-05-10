import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useCan } from "../services/hooks/useCan";

interface CanProps {
  children: ReactNode
  permissions?: string[]
  roles?: string[]
}

export const Can = ({children, permissions, roles}: CanProps) => {
  const userCanSeeComponent = useCan({ permissions, roles })
  if(!userCanSeeComponent){
    return <Flex fontWeight="bold" fontSize="9xl" justifyContent="center" alignItems="center" height="100vh">Sem permissão</Flex>
  }
  return (
    <>
      {children}
    </>
  )
}