import { Flex, Input, Text } from "@chakra-ui/react"

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
            _placeholder={{color:"gray.400"}} />
        </Flex>
    </Flex>
  )
}