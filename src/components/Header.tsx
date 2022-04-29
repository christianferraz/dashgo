import { Avatar, Box, Flex, HStack, Icon, Input, Text } from "@chakra-ui/react"
import {RiNotificationLine, RiSearchLine, RiUserAddLine} from "react-icons/ri"

export const Header = () => {
  return (
    <Flex as="header" w="100%" maxWidth={1480} h="20" mx="auto" mt="4" align="center" px="6">
      <Text
        fontSize={"3xl"}
        fontWeight="bold"
        letterSpacing={"tighter"}
        w="64">
          UISTI
          <Text color={"red.500"} as="span" ml="1">.</Text>
        </Text>
        <Flex
          as="label"
          flex={"1"}
          py="4"
          px="8"
          ml="6"
          maxWidth={400}
          alignSelf="center"
          position={"relative"}
          bg="gray.800"
          borderRadius={"full"}
        >
          <Input
            color={"gray.50"}
            variant={"unstyled"}
            placeholder={"Buscar na plataforma"}
          _placeholder={{ color: "gray.400" }} />
        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>
      <Flex
        align={"center"}
        ml={"auto"}
      >
        <HStack
          spacing={8}
          mx="8"
          pr={8}
          py={1}
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} />
          <Icon as={RiUserAddLine} />
        </HStack>
        <Flex align={"center"}>
          <Box mr="4" textAlign={"right"}>
            <Text>Christian Pacheco</Text>
            <Text color={"gray.300"} fontSize={"small"}>christianferraz@gmail.com</Text>
          </Box>
          <Avatar size={"md"} name={"Christian Miúcha"} src="https://avatars.githubusercontent.com/u/49967009?v=4" />
        </Flex>
      </Flex>
    </Flex>
  )
}