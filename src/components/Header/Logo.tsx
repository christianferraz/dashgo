import { Text } from "@chakra-ui/react"

export const Logo = () => {
  return (
    <Text
      fontSize={"3xl"}
      fontWeight="bold"
      letterSpacing={"tighter"}
      w="64">
        UISTI
      <Text color={"red.500"} as="span" ml="1">.</Text>
    </Text>
  )
}