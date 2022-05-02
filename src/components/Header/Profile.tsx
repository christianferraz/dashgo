import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

interface ProfileProps {
  showProfileData?: boolean
}

export const Profile = ({showProfileData = true}: ProfileProps) => {
  return (
    <Flex align={"center"}>
      { showProfileData && (
      <Box mr="4" textAlign={"right"}>
        <Text>Christian Pacheco</Text>
        <Text color={"gray.300"} fontSize={"small"}>christianferraz@gmail.com</Text>
      </Box>)}
    <Avatar size={"md"} name={"Christian Miúcha"} src="https://avatars.githubusercontent.com/u/49967009?v=4" />
  </Flex>
  )
}