import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

export const Profile = () => {
  return (
    <Flex align={"center"}>
      <Box mr="4" textAlign={"right"}>
        <Text>Christian Pacheco</Text>
        <Text color={"gray.300"} fontSize={"small"}>christianferraz@gmail.com</Text>
      </Box>
    <Avatar size={"md"} name={"Christian Miúcha"} src="https://avatars.githubusercontent.com/u/49967009?v=4" />
  </Flex>
  )
}