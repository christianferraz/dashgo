import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react"
import { useSidebarDrawer } from "../../Contexts/SidebarDrawerContext"
import { SidebarNav } from "./SidebarNav"

export const Sidebar = () => {
  const { isOpen, onClose } = useSidebarDrawer()
  const isDrawarSidebar = useBreakpointValue({
    base: true,
    lg: false
  })

  if (isDrawarSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={ onClose }>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  )
}