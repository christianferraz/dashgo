import { Box, Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react"
import { useContext } from "react"
import { RiMenuLine } from "react-icons/ri"
import { AuthContext } from "../../Contexts/AuthContext"
import { useSidebarDrawer } from "../../Contexts/SidebarDrawerContext"
import { Logo } from "./Logo"
import { NotificationsNav } from "./NotificationsNav"
import { Profile } from "./Profile"
import { SearchBox } from "./SearchBox"

export const Header = () => {
  const { onOpen } = useSidebarDrawer()
  const {signOut} = useContext(AuthContext)
  //mostra se for tamanho large
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6">
      <Logo />
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      ) }
      { isWideVersion && <SearchBox />}
      <Flex
        align={"center"}
        ml={"auto"}
      >
        <NotificationsNav />
        <Box as="a" onClick={signOut} >
          <Profile showProfileData={isWideVersion} />
        </Box>
      </Flex>
    </Flex>
  )
}